import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Market } from "./market.entity";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "event_id", unique: true })
    eventId: string;

    @Column()
    ticker: string;

    @Column()
    slug: string;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column({ name: "start_date" })
    startDate: Date;

    @Column({ name: "end_date" })
    endDate: Date;

    @Column({ name: "creation_date" })
    creationDate: Date;

    @Column({ default: true })
    active: boolean;

    @Column({ default: false })
    closed: boolean;

    @Column({ default: false })
    archived: boolean;

    @Column({ default: false })
    featured: boolean;

    @Column({ default: false })
    restricted: boolean;

    @Column("decimal", { precision: 20, scale: 8 })
    liquidity: number;

    @Column("decimal", { precision: 20, scale: 8 })
    volume: number;

    @Column({ name: "volume_24hr", type: "decimal", precision: 20, scale: 8 })
    volume24hr: number;

    @Column({ name: "volume_1wk", type: "decimal", precision: 20, scale: 8 })
    volume1wk: number;

    @Column({ name: "volume_1mo", type: "decimal", precision: 20, scale: 8 })
    volume1mo: number;

    @Column({ name: "volume_1yr", type: "decimal", precision: 20, scale: 8 })
    volume1yr: number;

    @Column("decimal", { precision: 10, scale: 8 })
    competitive: number;

    @OneToMany(() => Market, market => market.event, { cascade: true })
    markets: Market[];

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
} 