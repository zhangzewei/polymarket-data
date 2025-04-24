import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    name: string;

    @Column({ default: true })
    isRunning: boolean;

    @Column({ nullable: true })
    lastRunTime: Date;

    @Column({ nullable: true })
    nextRunTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
} 