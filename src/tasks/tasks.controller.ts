import { Controller, Get, Post, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { TaskStatusDto } from './dto/task-status.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get('status')
    @ApiOperation({ summary: 'Get all cron jobs status' })
    @ApiResponse({
        status: 200,
        description: 'Return all cron jobs status',
        type: [TaskStatusDto]
    })
    getCronJobsStatus(): TaskStatusDto[] {
        return this.tasksService.getCronJobsStatus();
    }

    @Post(':slug')
    @ApiOperation({ summary: 'Add a new cron job' })
    @ApiParam({ name: 'slug', description: 'The slug of the Polymarket event' })
    @ApiResponse({
        status: 201,
        description: 'Cron job added successfully',
        type: TaskResponseDto
    })
    @ApiResponse({ status: 400, description: 'Task already exists' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async addCronJob(@Param('slug') slug: string): Promise<TaskResponseDto> {
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
    @ApiOperation({ summary: 'Remove a cron job' })
    @ApiParam({ name: 'slug', description: 'The slug of the Polymarket event' })
    @ApiResponse({
        status: 200,
        description: 'Cron job removed successfully',
        type: TaskResponseDto
    })
    @ApiResponse({ status: 404, description: 'Task not found' })
    removeCronJob(@Param('slug') slug: string): TaskResponseDto {
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
    @ApiOperation({ summary: 'Pause a cron job' })
    @ApiParam({ name: 'slug', description: 'The slug of the Polymarket event' })
    @ApiResponse({
        status: 200,
        description: 'Cron job paused successfully',
        type: TaskResponseDto
    })
    @ApiResponse({ status: 404, description: 'Task not found' })
    pauseCronJob(@Param('slug') slug: string): TaskResponseDto {
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
    @ApiOperation({ summary: 'Resume a cron job' })
    @ApiParam({ name: 'slug', description: 'The slug of the Polymarket event' })
    @ApiResponse({
        status: 200,
        description: 'Cron job resumed successfully',
        type: TaskResponseDto
    })
    @ApiResponse({ status: 404, description: 'Task not found' })
    resumeCronJob(@Param('slug') slug: string): TaskResponseDto {
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