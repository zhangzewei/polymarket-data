import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('tasks')
export class Task {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    slug: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({ name: 'is_running', default: true })
    isRunning: boolean;

    @Field(() => Date, { nullable: true })
    @Column({ name: 'last_run_time', nullable: true })
    lastRunTime: Date;

    @Field(() => Date, { nullable: true })
    @Column({ name: 'next_run_time', nullable: true })
    nextRunTime: Date;

    @Field(() => Date)
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 