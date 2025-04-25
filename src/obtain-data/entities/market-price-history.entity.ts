import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Market } from "./market.entity";
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity("market_price_histories")
export class MarketPriceHistory {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: "market_id" })
    marketId: string;

    @Field()
    @Column({ name: "best_bid", type: "varchar" })
    bestBid: string;

    @Field()
    @Column({ name: "best_ask", type: "varchar" })
    bestAsk: string;

    @Field()
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Field(() => Market)
    @ManyToOne(() => Market, market => market.priceHistories)
    @JoinColumn({ name: "market_id", referencedColumnName: "marketId" })
    market: Market;
} 