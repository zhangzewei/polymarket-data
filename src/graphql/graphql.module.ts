import { Module } from '@nestjs/common';
import { TasksResolver } from './tasks.resolver';
import { EventsResolver } from './events.resolver';
import { TasksModule } from '../tasks/tasks.module';
import { ObtainDataModule } from '../obtain-data/obtain-data.module';

@Module({
    imports: [TasksModule, ObtainDataModule],
    providers: [TasksResolver, EventsResolver],
})
export class GraphQLModule { } 