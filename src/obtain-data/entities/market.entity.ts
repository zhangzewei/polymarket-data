import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Event } from "./event.entity";

@Entity("markets")
export class Market {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "market_id", unique: true })
    marketId: string;

    @Column({ name: "event_id" })
    eventId: string;

    @Column()
    question: string;

    @Column({ name: "condition_id" })
    conditionId: string;

    @Column()
    slug: string;

    @Column({ name: "start_date" })
    startDate: Date;

    @Column({ name: "end_date" })
    endDate: Date;

    @Column("text")
    description: string;

    @Column("json")
    outcomes: string[];

    @Column({ name: "outcome_prices", type: "json" })
    outcomePrices: string[];

    @Column("decimal", { precision: 20, scale: 8 })
    liquidity: number;

    @Column("decimal", { precision: 20, scale: 8 })
    volume: number;

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

    @Column({ name: "group_item_title" })
    groupItemTitle: string;

    @Column({ name: "group_item_threshold" })
    groupItemThreshold: string;

    @Column({ name: "question_id" })
    questionId: string;

    @Column({ name: "volume_24hr", type: "decimal", precision: 20, scale: 8 })
    volume24hr: number;

    @Column({ name: "volume_1wk", type: "decimal", precision: 20, scale: 8 })
    volume1wk: number;

    @Column({ name: "volume_1mo", type: "decimal", precision: 20, scale: 8 })
    volume1mo: number;

    @Column({ name: "volume_1yr", type: "decimal", precision: 20, scale: 8 })
    volume1yr: number;

    @Column({ name: "clob_token_ids", type: "json" })
    clobTokenIds: string[];

    @Column({ name: "uma_bond" })
    umaBond: string;

    @Column({ name: "uma_reward" })
    umaReward: string;

    @Column({ name: "volume_24hr_clob", type: "decimal", precision: 20, scale: 8 })
    volume24hrClob: number;

    @Column({ name: "volume_1wk_clob", type: "decimal", precision: 20, scale: 8 })
    volume1wkClob: number;

    @Column({ name: "volume_1mo_clob", type: "decimal", precision: 20, scale: 8 })
    volume1moClob: number;

    @Column({ name: "volume_1yr_clob", type: "decimal", precision: 20, scale: 8 })
    volume1yrClob: number;

    @Column({ name: "volume_clob", type: "decimal", precision: 20, scale: 8 })
    volumeClob: number;

    @Column({ name: "liquidity_clob", type: "decimal", precision: 20, scale: 8 })
    liquidityClob: number;

    @Column({ name: "accepting_orders", default: true })
    acceptingOrders: boolean;

    @Column({ name: "neg_risk", default: false })
    negRisk: boolean;

    @Column({ name: "neg_risk_market_id" })
    negRiskMarketId: string;

    @Column({ name: "neg_risk_request_id" })
    negRiskRequestId: string;

    @Column({ default: false })
    ready: boolean;

    @Column({ default: false })
    funded: boolean;

    @Column({ name: "accepting_orders_timestamp" })
    acceptingOrdersTimestamp: Date;

    @Column({ default: false })
    cyom: boolean;

    @Column("decimal", { precision: 10, scale: 8 })
    competitive: number;

    @Column({ name: "pager_duty_notification_enabled", default: false })
    pagerDutyNotificationEnabled: boolean;

    @Column({ default: false })
    approved: boolean;

    @Column({ name: "clob_rewards", type: "json" })
    clobRewards: any[];

    @Column({ name: "rewards_min_size" })
    rewardsMinSize: number;

    @Column({ name: "rewards_max_spread", type: "decimal", precision: 10, scale: 2 })
    rewardsMaxSpread: number;

    @Column("decimal", { precision: 10, scale: 8 })
    spread: number;

    @Column({ name: "one_day_price_change", type: "decimal", precision: 10, scale: 8 })
    oneDayPriceChange: number;

    @Column({ name: "one_hour_price_change", type: "decimal", precision: 10, scale: 8 })
    oneHourPriceChange: number;

    @Column({ name: "one_week_price_change", type: "decimal", precision: 10, scale: 8 })
    oneWeekPriceChange: number;

    @Column({ name: "one_month_price_change", type: "decimal", precision: 10, scale: 8 })
    oneMonthPriceChange: number;

    @Column({ name: "last_trade_price", type: "decimal", precision: 10, scale: 8 })
    lastTradePrice: number;

    @Column({ name: "best_bid", type: "decimal", precision: 10, scale: 8 })
    bestBid: number;

    @Column({ name: "best_ask", type: "decimal", precision: 10, scale: 8 })
    bestAsk: number;

    @Column({ name: "automatically_active", default: true })
    automaticallyActive: boolean;

    @Column({ name: "clear_book_on_start", default: true })
    clearBookOnStart: boolean;

    @Column({ name: "show_gmp_series", default: false })
    showGmpSeries: boolean;

    @Column({ name: "show_gmp_outcome", default: false })
    showGmpOutcome: boolean;

    @Column({ name: "manual_activation", default: false })
    manualActivation: boolean;

    @Column({ name: "neg_risk_other", default: false })
    negRiskOther: boolean;

    @Column({ name: "uma_resolution_statuses", type: "json" })
    umaResolutionStatuses: any[];

    @Column({ name: "pending_deployment", default: false })
    pendingDeployment: boolean;

    @Column({ default: false })
    deploying: boolean;

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date;

    @ManyToOne(() => Event, event => event.markets)
    @JoinColumn({ name: "event_id", referencedColumnName: "eventId" })
    event: Event;
} 