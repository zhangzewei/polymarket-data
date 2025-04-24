import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/entities/task.entity';
import { CreateTaskInput } from '../tasks/dto/create-task.input';

@Resolver(() => Task)
export class TasksResolver {
    constructor(private readonly tasksService: TasksService) { }

    @Query(() => [Task])
    async tasks(): Promise<Task[]> {
        return this.tasksService.findAll();
    }

    @Query(() => Task)
    async task(@Args('id', { type: () => Int }) id: number): Promise<Task> {
        return this.tasksService.findOne(id);
    }

    @Mutation(() => Task)
    async createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
        try {
            return await this.tasksService.create(createTaskInput);
        } catch (error) {
            throw new Error(`Failed to create task: ${error.message}`);
        }
    }
} 