import { Controller, Get, Post, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get('status')
    getCronJobsStatus() {
        return this.tasksService.getCronJobsStatus();
    }

    @Post(':slug')
    async addCronJob(@Param('slug') slug: string) {
        try {
            return await this.tasksService.addCronJob(slug);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to add job',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Delete(':slug')
    removeCronJob(@Param('slug') slug: string) {
        try {
            return this.tasksService.removeCronJob(slug);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to remove job',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post(':slug/pause')
    pauseCronJob(@Param('slug') slug: string) {
        try {
            return this.tasksService.pauseCronJob(slug);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to pause job',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    @Post(':slug/resume')
    resumeCronJob(@Param('slug') slug: string) {
        try {
            return this.tasksService.resumeCronJob(slug);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(
                'Failed to resume job',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
} 