import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { Market } from '../entities/market.entity';
import { MarketPriceHistory } from '../entities/market-price-history.entity';
import { EventDto, MarketDto } from '../dto/event.dto';
import { Between } from 'typeorm';
import { EventData } from '../types/event-data.type';

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
        private readonly eventRepository: Repository<Event>,
        @InjectRepository(Market)
        private readonly marketRepository: Repository<Market>,
        @InjectRepository(MarketPriceHistory)
        private readonly marketPriceHistoryRepository: Repository<MarketPriceHistory>
    ) { }

    // 将数值转换为字符串
    private convertNumberToString(value: number | null | undefined): string {
        if (value === null || value === undefined) {
            return '0';
        }
        return value.toString();
    }

    async saveEventData(eventData: EventData): Promise<void> {
        // 检查事件是否已存在
        const existingEvent = await this.eventRepository.findOne({
            where: { eventId: eventData.id }
        });

        // 如果事件不存在，创建新事件
        if (!existingEvent) {
            const event = new Event();
            const { id, startDate, endDate, creationDate, markets, ...restEventData } = eventData;

            // 只更新 Event 实体中定义的属性
            const eventToSave = {
                eventId: id,
                ticker: restEventData.ticker || '',
                slug: restEventData.slug || '',
                title: restEventData.title || '',
                description: restEventData.description || '',
                startDate: startDate ? startDate.toString() : '',
                endDate: endDate ? endDate.toString() : '',
                creationDate: creationDate ? creationDate.toString() : '',
                active: restEventData.active ?? true,
                closed: restEventData.closed ?? false,
                archived: restEventData.archived ?? false,
                featured: restEventData.featured ?? false,
                restricted: restEventData.restricted ?? false,
                liquidity: this.convertNumberToString(restEventData.liquidity),
                volume: this.convertNumberToString(restEventData.volume),
                volume24hr: this.convertNumberToString(restEventData.volume24hr),
                volume1wk: this.convertNumberToString(restEventData.volume1wk),
                volume1mo: this.convertNumberToString(restEventData.volume1mo),
                volume1yr: this.convertNumberToString(restEventData.volume1yr),
                competitive: this.convertNumberToString(restEventData.competitive),
            };

            Object.assign(event, eventToSave);
            await this.eventRepository.save(event);

            // 如果有市场数据，创建新市场
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
                        startDate: startDate ? startDate.toString() : '',
                        endDate: endDate ? endDate.toString() : '',
                        description: restMarketData.description || '',
                        outcomes: outcomes ? JSON.parse(outcomes) : [],
                        outcomePrices: outcomePrices ? JSON.parse(outcomePrices) : [],
                        liquidity: this.convertNumberToString(restMarketData.liquidity),
                        volume: this.convertNumberToString(restMarketData.volume),
                        active: restMarketData.active ?? true,
                        closed: restMarketData.closed ?? false,
                        archived: restMarketData.archived ?? false,
                        featured: restMarketData.featured ?? false,
                        restricted: restMarketData.restricted ?? false,
                        groupItemTitle: restMarketData.groupItemTitle || '',
                        groupItemThreshold: restMarketData.groupItemThreshold || '',
                        questionId: questionID || '',
                        volume24hr: this.convertNumberToString(restMarketData.volume24hr),
                        volume1wk: this.convertNumberToString(restMarketData.volume1wk),
                        volume1mo: this.convertNumberToString(restMarketData.volume1mo),
                        volume1yr: this.convertNumberToString(restMarketData.volume1yr),
                        clobTokenIds: clobTokenIds ? JSON.parse(clobTokenIds) : [],
                        umaBond: restMarketData.umaBond || '',
                        umaReward: restMarketData.umaReward || '',
                        volume24hrClob: this.convertNumberToString(restMarketData.volume24hrClob),
                        volume1wkClob: this.convertNumberToString(restMarketData.volume1wkClob),
                        volume1moClob: this.convertNumberToString(restMarketData.volume1moClob),
                        volume1yrClob: this.convertNumberToString(restMarketData.volume1yrClob),
                        volumeClob: this.convertNumberToString(restMarketData.volumeClob),
                        liquidityClob: this.convertNumberToString(restMarketData.liquidityClob),
                        acceptingOrders: restMarketData.acceptingOrders ?? true,
                        negRisk: restMarketData.negRisk ?? false,
                        negRiskMarketId: negRiskMarketID || '',
                        negRiskRequestId: negRiskRequestID || '',
                        ready: restMarketData.ready ?? false,
                        funded: restMarketData.funded ?? false,
                        acceptingOrdersTimestamp: acceptingOrdersTimestamp ? acceptingOrdersTimestamp.toString() : '',
                        cyom: restMarketData.cyom ?? false,
                        competitive: this.convertNumberToString(restMarketData.competitive),
                        pagerDutyNotificationEnabled: restMarketData.pagerDutyNotificationEnabled ?? false,
                        approved: restMarketData.approved ?? false,
                        clobRewards: restMarketData.clobRewards || [],
                        rewardsMinSize: this.convertNumberToString(restMarketData.rewardsMinSize),
                        rewardsMaxSpread: this.convertNumberToString(restMarketData.rewardsMaxSpread),
                        spread: this.convertNumberToString(restMarketData.spread),
                        oneDayPriceChange: this.convertNumberToString(restMarketData.oneDayPriceChange),
                        oneHourPriceChange: this.convertNumberToString(restMarketData.oneHourPriceChange),
                        oneWeekPriceChange: this.convertNumberToString(restMarketData.oneWeekPriceChange),
                        oneMonthPriceChange: this.convertNumberToString(restMarketData.oneMonthPriceChange),
                        lastTradePrice: this.convertNumberToString(restMarketData.lastTradePrice),
                        bestBid: this.convertNumberToString(restMarketData.bestBid),
                        bestAsk: this.convertNumberToString(restMarketData.bestAsk),
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

                    Object.assign(market, marketToSave);
                    await this.marketRepository.save(market);
                }));
            }
        }

        // 无论事件是否存在，都更新市场价格历史
        if (eventData.markets?.length) {
            await Promise.all(eventData.markets.map(async (marketData) => {
                const priceHistory = new MarketPriceHistory();
                priceHistory.marketId = marketData.id;
                priceHistory.bestBid = this.convertNumberToString(marketData.bestBid);
                priceHistory.bestAsk = this.convertNumberToString(marketData.bestAsk);
                await this.marketPriceHistoryRepository.save(priceHistory);
            }));
        }
    }

    async findAllEvents(): Promise<Event[]> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .orderBy('event.createdAt', 'DESC')
            .getMany();
    }

    async findEventById(eventId: string): Promise<Event | null> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .where('event.eventId = :eventId', { eventId: String(eventId) })
            .getOne();
    }

    async findEventsByStatus(active: boolean): Promise<Event[]> {
        return this.eventRepository.find({
            where: { active },
            relations: ['markets', 'markets.priceHistories'],
            order: {
                createdAt: 'DESC',
            },
        });
    }

    async findMarketsByEventId(eventId: string): Promise<Market[]> {
        return this.marketRepository
            .createQueryBuilder('market')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .where('market.eventId = :eventId', { eventId: String(eventId) })
            .orderBy('market.createdAt', 'DESC')
            .getMany();
    }

    async findMarketById(marketId: string): Promise<Market | null> {
        return this.marketRepository
            .createQueryBuilder('market')
            .leftJoinAndSelect('market.event', 'event')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .where('market.marketId = :marketId', { marketId: String(marketId) })
            .getOne();
    }

    async searchEvents(query: string): Promise<Event[]> {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoinAndSelect('event.markets', 'market')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .where('event.title ILIKE :query', { query: `%${query}%` })
            .orWhere('event.description ILIKE :query', { query: `%${query}%` })
            .orderBy('event.createdAt', 'DESC')
            .getMany();
    }

    async findRecentEvents(limit: number = 10): Promise<Event[]> {
        return this.eventRepository.find({
            relations: ['markets', 'markets.priceHistories'],
            order: {
                createdAt: 'DESC',
            },
            take: limit,
        });
    }

    async findEventsByDateRange(startDate: string, endDate: string): Promise<Event[]> {
        return this.eventRepository.find({
            where: {
                startDate: Between(startDate, endDate)
            }
        });
    }

    async getMarketPriceHistoryForEvent(eventId: string): Promise<{
        eventSlug: string;
        marketId: string;
        marketSlug: string;
        outcomes: string[];
        outcomePrices: string[];
        active: boolean;
        groupItemTitle: string;
        priceHistories: MarketPriceHistory[];
    }[]> {
        const markets = await this.marketRepository
            .createQueryBuilder('market')
            .leftJoinAndSelect('market.event', 'event')
            .leftJoinAndSelect('market.priceHistories', 'priceHistory')
            .where('market.eventId = :eventId', { eventId: String(eventId) })
            .orderBy('priceHistory.createdAt', 'ASC')
            .getMany();

        return markets.map(market => ({
            eventSlug: market.event.slug,
            marketId: market.marketId,
            marketSlug: market.slug,
            outcomes: market.outcomes,
            outcomePrices: market.outcomePrices,
            active: market.active,
            groupItemTitle: market.groupItemTitle,
            priceHistories: market.priceHistories
        }));
    }
} 