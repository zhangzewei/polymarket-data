import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { Market } from '../entities/market.entity';
import { EventDto, MarketDto } from '../dto/event.dto';
import { Between } from 'typeorm';

export interface EventData {
    id: string;
    ticker: string;
    slug: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    creationDate: string;
    active: boolean;
    closed: boolean;
    archived: boolean;
    featured: boolean;
    restricted: boolean;
    liquidity: number;
    volume: number;
    volume24hr: number;
    volume1wk: number;
    volume1mo: number;
    volume1yr: number;
    competitive: number;
    markets: MarketData[];
}

export interface MarketData {
    id: string;
    question: string;
    conditionId: string;
    slug: string;
    startDate: string;
    endDate: string;
    description: string;
    outcomes: string;
    outcomePrices: string;
    liquidity: number;
    volume: number;
    active: boolean;
    closed: boolean;
    archived: boolean;
    featured: boolean;
    restricted: boolean;
    groupItemTitle: string;
    groupItemThreshold: string;
    questionID: string;
    volume24hr: number;
    volume1wk: number;
    volume1mo: number;
    volume1yr: number;
    clobTokenIds: string;
    umaBond: string;
    umaReward: string;
    volume24hrClob: number;
    volume1wkClob: number;
    volume1moClob: number;
    volume1yrClob: number;
    volumeClob: number;
    liquidityClob: number;
    acceptingOrders: boolean;
    negRisk: boolean;
    negRiskMarketID: string;
    negRiskRequestID: string;
    ready: boolean;
    funded: boolean;
    acceptingOrdersTimestamp: string;
    cyom: boolean;
    competitive: number;
    pagerDutyNotificationEnabled: boolean;
    approved: boolean;
    clobRewards: any[];
    rewardsMinSize: number;
    rewardsMaxSpread: number;
    spread: number;
    oneDayPriceChange: number;
    oneHourPriceChange: number;
    oneWeekPriceChange: number;
    oneMonthPriceChange: number;
    lastTradePrice: number;
    bestBid: number;
    bestAsk: number;
    automaticallyActive: boolean;
    clearBookOnStart: boolean;
    showGmpSeries: boolean;
    showGmpOutcome: boolean;
    manualActivation: boolean;
    negRiskOther: boolean;
    umaResolutionStatuses: string;
    pendingDeployment: boolean;
    deploying: boolean;
}

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(Event)
        private eventRepository: Repository<Event>,
        @InjectRepository(Market)
        private marketRepository: Repository<Market>,
    ) { }

    async saveEventData(eventData: EventData): Promise<void> {
        // 检查事件是否已存在
        const existingEvent = await this.eventRepository.findOne({
            where: { eventId: eventData.id }
        });

        // 准备事件数据
        const event = new Event();
        const { id, startDate, endDate, creationDate, markets, ...restEventData } = eventData;

        // 只更新 Event 实体中定义的属性
        const eventToSave = {
            eventId: id,
            ticker: restEventData.ticker || '',
            slug: restEventData.slug || '',
            title: restEventData.title || '',
            description: restEventData.description || '',
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            creationDate: new Date(creationDate),
            active: restEventData.active ?? true,
            closed: restEventData.closed ?? false,
            archived: restEventData.archived ?? false,
            featured: restEventData.featured ?? false,
            restricted: restEventData.restricted ?? false,
            liquidity: restEventData.liquidity || 0,
            volume: restEventData.volume || 0,
            volume24hr: restEventData.volume24hr || 0,
            volume1wk: restEventData.volume1wk || 0,
            volume1mo: restEventData.volume1mo || 0,
            volume1yr: restEventData.volume1yr || 0,
            competitive: restEventData.competitive || 0,
        };

        // 如果事件已存在，更新它
        if (existingEvent) {
            await this.eventRepository.update({ eventId: id }, eventToSave);
        } else {
            // 如果不存在，创建新事件
            Object.assign(event, eventToSave);
            await this.eventRepository.save(event);
        }

        // 如果有市场数据，并行保存所有市场
        if (markets?.length) {
            await Promise.all(markets.map(async (marketData) => {
                const market = new Market();
                const {
                    id,
                    startDate,
                    endDate,
                    acceptingOrdersTimestamp,
                    outcomes,
                    outcomePrices,
                    clobTokenIds,
                    umaResolutionStatuses,
                    questionID,
                    negRiskMarketID,
                    negRiskRequestID,
                    ...restMarketData
                } = marketData;

                // 只更新 Market 实体中定义的属性
                const marketToSave = {
                    marketId: id,
                    eventId: event.eventId,
                    question: restMarketData.question || '',
                    conditionId: restMarketData.conditionId || '',
                    slug: restMarketData.slug || '',
                    startDate: new Date(startDate),
                    endDate: new Date(endDate),
                    description: restMarketData.description || '',
                    outcomes: outcomes ? JSON.parse(outcomes) : [],
                    outcomePrices: outcomePrices ? JSON.parse(outcomePrices) : [],
                    liquidity: restMarketData.liquidity || 0,
                    volume: restMarketData.volume || 0,
                    active: restMarketData.active ?? true,
                    closed: restMarketData.closed ?? false,
                    archived: restMarketData.archived ?? false,
                    featured: restMarketData.featured ?? false,
                    restricted: restMarketData.restricted ?? false,
                    groupItemTitle: restMarketData.groupItemTitle || '',
                    groupItemThreshold: restMarketData.groupItemThreshold || '',
                    questionId: questionID || '',
                    volume24hr: restMarketData.volume24hr || 0,
                    volume1wk: restMarketData.volume1wk || 0,
                    volume1mo: restMarketData.volume1mo || 0,
                    volume1yr: restMarketData.volume1yr || 0,
                    clobTokenIds: clobTokenIds ? JSON.parse(clobTokenIds) : [],
                    umaBond: restMarketData.umaBond || '',
                    umaReward: restMarketData.umaReward || '',
                    volume24hrClob: restMarketData.volume24hrClob || 0,
                    volume1wkClob: restMarketData.volume1wkClob || 0,
                    volume1moClob: restMarketData.volume1moClob || 0,
                    volume1yrClob: restMarketData.volume1yrClob || 0,
                    volumeClob: restMarketData.volumeClob || 0,
                    liquidityClob: restMarketData.liquidityClob || 0,
                    acceptingOrders: restMarketData.acceptingOrders ?? true,
                    negRisk: restMarketData.negRisk ?? false,
                    negRiskMarketId: negRiskMarketID || '',
                    negRiskRequestId: negRiskRequestID || '',
                    ready: restMarketData.ready ?? false,
                    funded: restMarketData.funded ?? false,
                    acceptingOrdersTimestamp: acceptingOrdersTimestamp ? new Date(acceptingOrdersTimestamp) : undefined,
                    cyom: restMarketData.cyom ?? false,
                    competitive: restMarketData.competitive || 0,
                    pagerDutyNotificationEnabled: restMarketData.pagerDutyNotificationEnabled ?? false,
                    approved: restMarketData.approved ?? false,
                    clobRewards: restMarketData.clobRewards || [],
                    rewardsMinSize: restMarketData.rewardsMinSize || 0,
                    rewardsMaxSpread: restMarketData.rewardsMaxSpread || 0,
                    spread: restMarketData.spread || 0,
                    oneDayPriceChange: restMarketData.oneDayPriceChange || 0,
                    oneHourPriceChange: restMarketData.oneHourPriceChange || 0,
                    oneWeekPriceChange: restMarketData.oneWeekPriceChange || 0,
                    oneMonthPriceChange: restMarketData.oneMonthPriceChange || 0,
                    lastTradePrice: restMarketData.lastTradePrice || 0,
                    bestBid: restMarketData.bestBid || 0,
                    bestAsk: restMarketData.bestAsk || 0,
                    automaticallyActive: restMarketData.automaticallyActive ?? true,
                    clearBookOnStart: restMarketData.clearBookOnStart ?? true,
                    showGmpSeries: restMarketData.showGmpSeries ?? false,
                    showGmpOutcome: restMarketData.showGmpOutcome ?? false,
                    manualActivation: restMarketData.manualActivation ?? false,
                    negRiskOther: restMarketData.negRiskOther ?? false,
                    umaResolutionStatuses: umaResolutionStatuses ? JSON.parse(umaResolutionStatuses) : [],
                    pendingDeployment: restMarketData.pendingDeployment ?? false,
                    deploying: restMarketData.deploying ?? false,
                };

                // 检查市场是否已存在
                const existingMarket = await this.marketRepository.findOne({
                    where: { marketId: id }
                });

                if (existingMarket) {
                    // 如果存在，更新市场数据
                    await this.marketRepository.update({ marketId: id }, marketToSave);
                } else {
                    // 如果不存在，创建新市场
                    Object.assign(market, marketToSave);
                    await this.marketRepository.save(market);
                }
            }));
        }
    }

    async findAllEvents(): Promise<Event[]> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .orderBy('event.createdAt', 'DESC')
            .getMany();
    }

    async findEventById(eventId: string): Promise<Event | null> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .where('event.eventId = :eventId', { eventId: String(eventId) })
            .getOne();
    }

    async findEventsByStatus(active: boolean): Promise<Event[]> {
        return this.eventRepository.find({
            where: { active },
            relations: ['markets'],
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async findMarketsByEventId(eventId: string): Promise<Market[]> {
        return this.marketRepository
            .createQueryBuilder('market')
            .where('market.eventId = :eventId', { eventId: String(eventId) })
            .orderBy('market.createdAt', 'DESC')
            .getMany();
    }

    async findMarketById(marketId: string): Promise<Market | null> {
        return this.marketRepository
            .createQueryBuilder('market')
            .leftJoinAndSelect('market.event', 'event')
            .where('market.marketId = :marketId', { marketId: String(marketId) })
            .getOne();
    }

    async searchEvents(query: string): Promise<Event[]> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .where('event.title ILIKE :query', { query: `%${query}%` })
            .orWhere('event.description ILIKE :query', { query: `%${query}%` })
            .orderBy('event.createdAt', 'DESC')
            .getMany();
    }

    async findRecentEvents(limit: number = 10): Promise<Event[]> {
        return this.eventRepository.find({
            relations: ['markets'],
            order: {
                createdAt: 'DESC',
            },
            take: limit,
        });
    }

    async findEventsByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
        return this.eventRepository.find({
            where: {
                startDate: Between(startDate, endDate),
            },
            relations: ['markets'],
            order: {
                startDate: 'ASC',
            },
        });
    }
} 