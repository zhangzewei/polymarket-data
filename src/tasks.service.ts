import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ObtainDataService } from './obtain-data/obtain-data.service';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(
        private readonly obtainDataService: ObtainDataService
    ) { }

    // 每分钟执行一次
    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        this.logger.debug('Called every minute');
        // 在这里添加你的定时任务逻辑
        const data = await this.obtainDataService.getEventBySlug('what-continent-will-next-pope-be-from');
        console.log(data);
    }
} 