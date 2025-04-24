import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Market } from "./market.entity";
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity("events")
export class Event {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: "event_id", unique: true })
    eventId: string;

    @Field()
    @Column()
    ticker: string;

    @Field()
    @Column()
    slug: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column("text")
    description: string;

    @Field(() => Date)
    @Column({ name: "start_date" })
    startDate: Date;

    @Field(() => Date)
    @Column({ name: "end_date" })
    endDate: Date;

    @Field(() => Date)
    @Column({ name: "creation_date" })
    creationDate: Date;

    @Field()
    @Column({ default: true })
    active: boolean;

    @Field()
    @Column({ default: false })
    closed: boolean;

    @Field()
    @Column({ default: false })
    archived: boolean;

    @Field()
    @Column({ default: false })
    featured: boolean;

    @Field()
    @Column({ default: false })
    restricted: boolean;

    @Field(() => Float)
    @Column("decimal", { precision: 20, scale: 8 })
    liquidity: number;

    @Field(() => Float)
    @Column("decimal", { precision: 20, scale: 8 })
    volume: number;

    @Field(() => Float)
    @Column({ name: "volume_24hr", type: "decimal", precision: 20, scale: 8 })
    volume24hr: number;

    @Field(() => Float)
    @Column({ name: "volume_1wk", type: "decimal", precision: 20, scale: 8 })
    volume1wk: number;

    @Field(() => Float)
    @Column({ name: "volume_1mo", type: "decimal", precision: 20, scale: 8 })
    volume1mo: number;

    @Field(() => Float)
    @Column({ name: "volume_1yr", type: "decimal", precision: 20, scale: 8 })
    volume1yr: number;

    @Field(() => Float)
    @Column("decimal", { precision: 10, scale: 8 })
    competitive: number;

    @Field(() => [Market])
    @OneToMany(() => Market, market => market.event, { cascade: true })
    markets: Market[];

    @Field(() => Date)
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;
} 