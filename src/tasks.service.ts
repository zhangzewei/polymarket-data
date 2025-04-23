import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly configService: ConfigService) { }

    // 每分钟执行一次
    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.logger.debug('Called every minute');
        // 在这里添加你的定时任务逻辑
    }
} 