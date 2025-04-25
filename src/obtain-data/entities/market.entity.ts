import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./event.entity";
import { ObjectType, Field, Int } from '@nestjs/graphql';
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

    @Field()
    @Column({ name: "start_date", type: "varchar" })
    startDate: string;

    @Field()
    @Column({ name: "end_date", type: "varchar" })
    endDate: string;

    @Field()
    @Column("text")
    description: string;

    @Field(() => [String])
    @Column("json")
    outcomes: string[];

    @Field(() => [String])
    @Column({ name: "outcome_prices", type: "json" })
    outcomePrices: string[];

    @Field()
    @Column({ type: "varchar" })
    liquidity: string;

    @Field()
    @Column({ type: "varchar" })
    volume: string;

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

    @Field(() => [String])
    @Column({ name: "clob_token_ids", type: "json" })
    clobTokenIds: string[];

    @Field()
    @Column({ name: "uma_bond" })
    umaBond: string;

    @Field()
    @Column({ name: "uma_reward" })
    umaReward: string;

    @Field()
    @Column({ name: "volume_24hr_clob", type: "varchar" })
    volume24hrClob: string;

    @Field()
    @Column({ name: "volume_1wk_clob", type: "varchar" })
    volume1wkClob: string;

    @Field()
    @Column({ name: "volume_1mo_clob", type: "varchar" })
    volume1moClob: string;

    @Field()
    @Column({ name: "volume_1yr_clob", type: "varchar" })
    volume1yrClob: string;

    @Field()
    @Column({ name: "volume_clob", type: "varchar" })
    volumeClob: string;

    @Field()
    @Column({ name: "liquidity_clob", type: "varchar" })
    liquidityClob: string;

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

    @Field()
    @Column({ name: "accepting_orders_timestamp", type: "varchar" })
    acceptingOrdersTimestamp: string;

    @Field()
    @Column({ default: false })
    cyom: boolean;

    @Field()
    @Column({ type: "varchar" })
    competitive: string;

    @Field()
    @Column({ name: "pager_duty_notification_enabled", default: false })
    pagerDutyNotificationEnabled: boolean;

    @Field()
    @Column({ default: false })
    approved: boolean;

    @Field(() => [ClobReward])
    @Column({ name: "clob_rewards", type: "json" })
    clobRewards: ClobReward[];

    @Field()
    @Column({ name: "rewards_min_size", type: "varchar" })
    rewardsMinSize: string;

    @Field()
    @Column({ name: "rewards_max_spread", type: "varchar" })
    rewardsMaxSpread: string;

    @Field()
    @Column({ type: "varchar" })
    spread: string;

    @Field()
    @Column({ name: "one_day_price_change", type: "varchar" })
    oneDayPriceChange: string;

    @Field()
    @Column({ name: "one_hour_price_change", type: "varchar" })
    oneHourPriceChange: string;

    @Field()
    @Column({ name: "one_week_price_change", type: "varchar" })
    oneWeekPriceChange: string;

    @Field()
    @Column({ name: "one_month_price_change", type: "varchar" })
    oneMonthPriceChange: string;

    @Field()
    @Column({ name: "last_trade_price", type: "varchar" })
    lastTradePrice: string;

    @Field()
    @Column({ name: "best_bid", type: "varchar" })
    bestBid: string;

    @Field()
    @Column({ name: "best_ask", type: "varchar" })
    bestAsk: string;

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

    @Field()
    @CreateDateColumn({ name: "created_at", type: "varchar" })
    createdAt: string;

    @Field()
    @UpdateDateColumn({ name: "updated_at", type: "varchar" })
    updatedAt: string;

    @Field(() => Event)
    @ManyToOne(() => Event, event => event.markets)
    @JoinColumn({ name: "event_id", referencedColumnName: "eventId" })
    event: Event;
} 