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

    @Field()
    @Column({ name: "start_date", type: "varchar" })
    startDate: string;

    @Field()
    @Column({ name: "end_date", type: "varchar" })
    endDate: string;

    @Field()
    @Column({ name: "creation_date", type: "varchar" })
    creationDate: string;

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

    @Field()
    @Column({ type: "varchar" })
    liquidity: string;

    @Field()
    @Column({ type: "varchar" })
    volume: string;

    @Field()
    @Column({ name: "volume_24hr", type: "varchar" })
    volume24hr: string;

    @Field()
    @Column({ name: "volume_1wk", type: "varchar" })
    volume1wk: string;

    @Field()
    @Column({ name: "volume_1mo", type: "varchar" })
    volume1mo: string;

    @Field()
    @Column({ name: "volume_1yr", type: "varchar" })
    volume1yr: string;

    @Field()
    @Column({ type: "varchar" })
    competitive: string;

    @Field(() => [Market])
    @OneToMany(() => Market, market => market.event, { cascade: true })
    markets: Market[];

    @Field()
    @CreateDateColumn({ name: "created_at", type: "varchar" })
    createdAt: string;

    @Field()
    @UpdateDateColumn({ name: "updated_at", type: "varchar" })
    updatedAt: string;
} 