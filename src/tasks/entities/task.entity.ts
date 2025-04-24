import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    slug: string;

    @Column()
    name: string;

    @Column({ name: 'is_running', default: true })
    isRunning: boolean;

    @Column({ name: 'last_run_time', nullable: true })
    lastRunTime: Date;

    @Column({ name: 'next_run_time', nullable: true })
    nextRunTime: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
} 