import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { ObtainDataController } from './obtain-data/obtain-data.controller';
import { ObtainDataService } from './obtain-data/obtain-data.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ObtainDataController, TasksController],
  providers: [AppService, TasksService, ObtainDataService],
})
export class AppModule { }
