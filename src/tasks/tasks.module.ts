import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { ObtainDataModule } from '../obtain-data/obtain-data.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Task]),
        ObtainDataModule,
    ],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TasksModule { } 