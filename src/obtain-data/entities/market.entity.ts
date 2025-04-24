import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./event.entity";
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { ClobReward } from './clob-reward.type';
import { UmaResolutionStatus } from './uma-resolution-status.type';

@ObjectType()
@Entity("markets")
export class Market {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: "market_id", unique: true })
    marketId: string;

    @Field()
    @Column({ name: "event_id" })
    eventId: string;

    @Field()
    @Column()
    question: string;

    @Field()
    @Column({ name: "condition_id" })
    conditionId: string;

    @Field()
    @Column()
    slug: string;

    @Field(() => Date)
    @Column({ name: "start_date" })
    startDate: Date;

    @Field(() => Date)
    @Column({ name: "end_date" })
    endDate: Date;

    @Field()
    @Column("text")
    description: string;

    @Field(() => [String])
    @Column("json")
    outcomes: string[];

    @Field(() => [String])
    @Column({ name: "outcome_prices", type: "json" })
    outcomePrices: string[];

    @Field(() => Float)
    @Column("decimal", { precision: 20, scale: 8 })
    liquidity: number;

    @Field(() => Float)
    @Column("decimal", { precision: 20, scale: 8 })
    volume: number;

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
    @Column({ name: "group_item_title" })
    groupItemTitle: string;

    @Field()
    @Column({ name: "group_item_threshold" })
    groupItemThreshold: string;

    @Field()
    @Column({ name: "question_id" })
    questionId: string;

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

    @Field(() => [String])
    @Column({ name: "clob_token_ids", type: "json" })
    clobTokenIds: string[];

    @Field()
    @Column({ name: "uma_bond" })
    umaBond: string;

    @Field()
    @Column({ name: "uma_reward" })
    umaReward: string;

    @Field(() => Float)
    @Column({ name: "volume_24hr_clob", type: "decimal", precision: 20, scale: 8 })
    volume24hrClob: number;

    @Field(() => Float)
    @Column({ name: "volume_1wk_clob", type: "decimal", precision: 20, scale: 8 })
    volume1wkClob: number;

    @Field(() => Float)
    @Column({ name: "volume_1mo_clob", type: "decimal", precision: 20, scale: 8 })
    volume1moClob: number;

    @Field(() => Float)
    @Column({ name: "volume_1yr_clob", type: "decimal", precision: 20, scale: 8 })
    volume1yrClob: number;

    @Field(() => Float)
    @Column({ name: "volume_clob", type: "decimal", precision: 20, scale: 8 })
    volumeClob: number;

    @Field(() => Float)
    @Column({ name: "liquidity_clob", type: "decimal", precision: 20, scale: 8 })
    liquidityClob: number;

    @Field()
    @Column({ name: "accepting_orders", default: true })
    acceptingOrders: boolean;

    @Field()
    @Column({ name: "neg_risk", default: false })
    negRisk: boolean;

    @Field()
    @Column({ name: "neg_risk_market_id" })
    negRiskMarketId: string;

    @Field()
    @Column({ name: "neg_risk_request_id" })
    negRiskRequestId: string;

    @Field()
    @Column({ default: false })
    ready: boolean;

    @Field()
    @Column({ default: false })
    funded: boolean;

    @Field(() => Date)
    @Column({ name: "accepting_orders_timestamp" })
    acceptingOrdersTimestamp: Date;

    @Field()
    @Column({ default: false })
    cyom: boolean;

    @Field(() => Float)
    @Column("decimal", { precision: 10, scale: 8 })
    competitive: number;

    @Field()
    @Column({ name: "pager_duty_notification_enabled", default: false })
    pagerDutyNotificationEnabled: boolean;

    @Field()
    @Column({ default: false })
    approved: boolean;

    @Field(() => [ClobReward])
    @Column({ name: "clob_rewards", type: "json" })
    clobRewards: ClobReward[];

    @Field(() => Float)
    @Column({ name: "rewards_min_size" })
    rewardsMinSize: number;

    @Field(() => Float)
    @Column({ name: "rewards_max_spread", type: "decimal", precision: 10, scale: 2 })
    rewardsMaxSpread: number;

    @Field(() => Float)
    @Column("decimal", { precision: 10, scale: 8 })
    spread: number;

    @Field(() => Float)
    @Column({ name: "one_day_price_change", type: "decimal", precision: 10, scale: 8 })
    oneDayPriceChange: number;

    @Field(() => Float)
    @Column({ name: "one_hour_price_change", type: "decimal", precision: 10, scale: 8 })
    oneHourPriceChange: number;

    @Field(() => Float)
    @Column({ name: "one_week_price_change", type: "decimal", precision: 10, scale: 8 })
    oneWeekPriceChange: number;

    @Field(() => Float)
    @Column({ name: "one_month_price_change", type: "decimal", precision: 10, scale: 8 })
    oneMonthPriceChange: number;

    @Field(() => Float)
    @Column({ name: "last_trade_price", type: "decimal", precision: 10, scale: 8 })
    lastTradePrice: number;

    @Field(() => Float)
    @Column({ name: "best_bid", type: "decimal", precision: 10, scale: 8 })
    bestBid: number;

    @Field(() => Float)
    @Column({ name: "best_ask", type: "decimal", precision: 10, scale: 8 })
    bestAsk: number;

    @Field()
    @Column({ name: "automatically_active", default: true })
    automaticallyActive: boolean;

    @Field()
    @Column({ name: "clear_book_on_start", default: true })
    clearBookOnStart: boolean;

    @Field()
    @Column({ name: "show_gmp_series", default: false })
    showGmpSeries: boolean;

    @Field()
    @Column({ name: "show_gmp_outcome", default: false })
    showGmpOutcome: boolean;

    @Field()
    @Column({ name: "manual_activation", default: false })
    manualActivation: boolean;

    @Field()
    @Column({ name: "neg_risk_other", default: false })
    negRiskOther: boolean;

    @Field(() => [UmaResolutionStatus])
    @Column({ name: "uma_resolution_statuses", type: "json" })
    umaResolutionStatuses: UmaResolutionStatus[];

    @Field()
    @Column({ name: "pending_deployment", default: false })
    pendingDeployment: boolean;

    @Field()
    @Column({ default: false })
    deploying: boolean;

    @Field(() => Date)
    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @Field(() => Event)
    @ManyToOne(() => Event, event => event.markets)
    @JoinColumn({ name: "event_id", referencedColumnName: "eventId" })
    event: Event;
} 