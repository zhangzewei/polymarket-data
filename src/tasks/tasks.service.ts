import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { ObtainDataService } from '../obtain-data/obtain-data.service';
import { CronJob } from 'cron';
import { TaskStatusDto } from './dto/task-status.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    private readonly jobStatus = new Map<string, boolean>();

    constructor(
        private readonly obtainDataService: ObtainDataService,
        private readonly schedulerRegistry: SchedulerRegistry
    ) { }

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
            this.jobStatus.set(jobName, true);
            job.start();

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
    removeCronJob(slug: string): TaskResponseDto {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        // 停止任务
        job.stop();
        // 从调度器中删除任务
        this.schedulerRegistry.deleteCronJob(jobName);
        this.jobStatus.delete(jobName);

        this.logger.log(`Removed cron job for slug: ${slug}`);
        return { message: `Successfully removed cron job for ${slug}` };
    }

    // 获取所有定时任务状态
    getCronJobsStatus(): TaskStatusDto[] {
        const jobs = this.schedulerRegistry.getCronJobs();
        return Array.from(jobs.entries()).map(([name, job]) => ({
            name,
            slug: name.replace('polymarket-', ''),
            isRunning: this.jobStatus.get(name) || false,
            nextDate: job.nextDate().toString()
        }));
    }

    // 暂停指定定时任务
    pauseCronJob(slug: string): TaskResponseDto {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        job.stop();
        this.jobStatus.set(jobName, false);
        this.logger.log(`Job for ${slug} paused`);
        return { message: `Job for ${slug} paused successfully` };
    }

    // 恢复指定定时任务
    resumeCronJob(slug: string): TaskResponseDto {
        const jobName = `polymarket-${slug}`;
        const job = this.schedulerRegistry.getCronJobs().get(jobName);

        if (!job) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }

        job.start();
        this.jobStatus.set(jobName, true);
        this.logger.log(`Job for ${slug} resumed`);
        return { message: `Job for ${slug} resumed successfully` };
    }

    // 处理单个任务
    private async processJob(slug: string) {
        try {
            this.logger.debug(`Processing job for slug: ${slug}`);
            const data = await this.obtainDataService.getEventBySlug(slug);
            console.log(`Data for ${slug}:`, data);
        } catch (error) {
            this.logger.error(`Error processing job for ${slug}: ${error.message}`);
        }
    }
} 