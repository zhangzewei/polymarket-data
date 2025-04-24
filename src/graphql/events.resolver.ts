import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { EventService } from '../obtain-data/services/event.service';
import { Event } from '../obtain-data/entities/event.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MarketSummary } from '../obtain-data/entities/market-summary.type';

@Resolver(() => Event)
export class EventsResolver {
    constructor(private readonly eventService: EventService) { }

    @Query(() => [Event])
    async events(): Promise<Event[]> {
        return this.eventService.findAllEvents();
    }

    @Query(() => Event)
    async event(@Args('id', { type: () => Int }) id: number): Promise<Event> {
        const event = await this.eventService.findEventById(id.toString());
        if (!event) {
            throw new HttpException('Event not found', HttpStatus.NOT_FOUND);
        }
        return event;
    }

    @Query(() => [Event])
    async activeEvents(): Promise<Event[]> {
        return this.eventService.findEventsByStatus(true);
    }

    @Query(() => [Event])
    async searchEvents(@Args('query') query: string): Promise<Event[]> {
        return this.eventService.searchEvents(query);
    }

    @Query(() => [Event])
    async recentEvents(@Args('limit', { type: () => Int, defaultValue: 10 }) limit: number): Promise<Event[]> {
        return this.eventService.findRecentEvents(limit);
    }

    @Query(() => [MarketSummary])
    async marketSummaries(): Promise<MarketSummary[]> {
        const events = await this.eventService.findAllEvents();
        const marketSummaries: MarketSummary[] = [];

        for (const event of events) {
            if (event.markets) {
                for (const market of event.markets) {
                    marketSummaries.push({
                        slug: market.slug,
                        outcomes: market.outcomes,
                        outcomePrices: market.outcomePrices,
                        active: market.active,
                        groupItemTitle: market.groupItemTitle,
                        bestBid: market.bestBid,
                        bestAsk: market.bestAsk,
                    });
                }
            }
        }

        return marketSummaries;
    }

    @Query(() => [MarketSummary])
    async activeMarketSummaries(): Promise<MarketSummary[]> {
        const events = await this.eventService.findEventsByStatus(true);
        const marketSummaries: MarketSummary[] = [];

        for (const event of events) {
            if (event.markets) {
                for (const market of event.markets) {
                    if (market.active) {
                        marketSummaries.push({
                            slug: market.slug,
                            outcomes: market.outcomes,
                            outcomePrices: market.outcomePrices,
                            active: market.active,
                            groupItemTitle: market.groupItemTitle,
                            bestBid: market.bestBid,
                            bestAsk: market.bestAsk,
                        });
                    }
                }
            }
        }

        return marketSummaries;
    }
} 