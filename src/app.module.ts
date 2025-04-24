import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks/tasks.service';
import { TasksController } from './tasks/tasks.controller';
import { ObtainDataController } from './obtain-data/obtain-data.controller';
import { ObtainDataService } from './obtain-data/obtain-data.service';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'polymarket'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC', false),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Task]),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController, ObtainDataController, TasksController],
  providers: [AppService, TasksService, ObtainDataService],
})
export class AppModule { }
