import { ApiProperty } from '@nestjs/swagger';

export class TaskStatusDto {
    @ApiProperty({ description: 'The name of the cron job' })
    name: string;

    @ApiProperty({ description: 'The slug of the Polymarket event' })
    slug: string;

    @ApiProperty({ description: 'Whether the job is currently running' })
    isRunning: boolean;

    @ApiProperty({ description: 'The next scheduled execution time', type: 'string' })
    nextDate: string;
} 