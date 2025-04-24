import { Injectable, Logger, HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObtainDataService } from '../obtain-data/obtain-data.service';
import { EventService } from '../obtain-data/services/event.service';
import { CronJob } from 'cron';
import { TaskStatusDto } from './dto/task-status.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService implements OnModuleInit {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly obtainDataService: ObtainDataService,
        private readonly eventService: EventService,
        private readonly schedulerRegistry: SchedulerRegistry,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) { }

    // 服务启动时加载所有任务
    async onModuleInit() {
        try {
            this.logger.log('Loading tasks from database...');
            const tasks = await this.taskRepository.find();

            for (const task of tasks) {
                try {
                    // 创建新的定时任务
                    const job = new CronJob(CronExpression.EVERY_MINUTE, () => {
                        this.processJob(task.slug);
                    });

                    // 添加到调度器
                    this.schedulerRegistry.addCronJob(task.name, job);

                    // 如果任务之前是运行状态，则启动它
                    if (task.isRunning) {
                        job.start();
                        this.logger.log(`Started task: ${task.name}`);
                    } else {
                        this.logger.log(`Task ${task.name} is paused`);
                    }
                } catch (error) {
                    this.logger.error(`Failed to load task ${task.name}: ${error.message}`);
                }
            }

            this.logger.log(`Loaded ${tasks.length} tasks from database`);
        } catch (error) {
            this.logger.error(`Failed to load tasks from database: ${error.message}`);
        }
    }

    // 添加新的定时任务
    async addCronJob(slug: string): Promise<TaskResponseDto> {
        try {
            const jobName = `polymarket-${slug}`;

            // 检查任务是否已存在
            if (this.schedulerRegistry.getCronJobs().has(jobName)) {
                throw new HttpException('Task already exists', HttpStatus.BAD_REQUEST);
            }

            // 验证 slug 是否有效
            await this.obtainDataService.getEventBySlug(slug);

            // 创建新的定时任务
            const job = new CronJob(CronExpression.EVERY_MINUTE, () => {
                this.processJob(slug);
            });

            // 添加到调度器
            this.schedulerRegistry.addCronJob(jobName, job);
            job.start();

            // 保存到数据库
            const task = this.taskRepository.create({
                slug,
                name: jobName,
                isRunning: true,
                nextRunTime: job.nextDate()
            });
            await this.taskRepository.save(task);

            this.logger.log(`Added new cron job for slug: ${slug}`);
            return { message: `Successfully added cron job for ${slug}` };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to add cron job',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    // 删除定时任务
    async removeCronJob(slug: string): Promise<TaskResponseDto> {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        // 停止任务
        job.stop();
        // 从调度器中删除任务
        this.schedulerRegistry.deleteCronJob(jobName);

        // 从数据库中删除
        await this.taskRepository.delete({ slug });

        this.logger.log(`Removed cron job for slug: ${slug}`);
        return { message: `Successfully removed cron job for ${slug}` };
    }

    // 获取所有定时任务状态
    async getCronJobsStatus(): Promise<TaskStatusDto[]> {
        const tasks = await this.taskRepository.find();

        return tasks.map(task => ({
            name: task.name,
            slug: task.slug,
            isRunning: task.isRunning,
            nextDate: task.nextRunTime?.toString() || 'Not scheduled'
        }));
    }

    // 暂停指定定时任务
    async pauseCronJob(slug: string): Promise<TaskResponseDto> {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        job.stop();

        // 更新数据库状态
        await this.taskRepository.update(
            { slug },
            { isRunning: false }
        );

        this.logger.log(`Job for ${slug} paused`);
        return { message: `Job for ${slug} paused successfully` };
    }

    // 恢复指定定时任务
    async resumeCronJob(slug: string): Promise<TaskResponseDto> {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        job.start();

        // 更新数据库状态
        await this.taskRepository.update(
            { slug },
            {
                isRunning: true,
                nextRunTime: job.nextDate()
            }
        );

        this.logger.log(`Job for ${slug} resumed`);
        return { message: `Job for ${slug} resumed successfully` };
    }

    // 处理单个任务
    private async processJob(slug: string) {
        try {
            this.logger.debug(`Processing job for slug: ${slug}`);
            const eventData = await this.obtainDataService.getEventBySlug(slug);

            if (!eventData) {
                this.logger.warn(`No data found for slug: ${slug}`);
                return;
            }

            // 保存事件和市场数据到数据库
            await this.eventService.saveEventData(eventData);
            this.logger.debug(`Successfully saved event data for slug: ${slug}`);

            // 更新最后执行时间
            const job = this.schedulerRegistry.getCronJobs().get(`polymarket-${slug}`);
            if (job) {
                await this.taskRepository.update(
                    { slug },
                    {
                        lastRunTime: new Date(),
                        nextRunTime: job.nextDate()
                    }
                );
            }
        } catch (error) {
            this.logger.error(`Error processing job for ${slug}: ${error.message}`);
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                `Failed to process job for ${slug}: ${error.message}`,
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
} 