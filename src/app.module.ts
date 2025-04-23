import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks.service';
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
  controllers: [AppController, ObtainDataController],
  providers: [AppService, TasksService, ObtainDataService],
})
export class AppModule { }
