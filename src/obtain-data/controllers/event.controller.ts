import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.entity';
import { Market } from '../entities/market.entity';

@Controller('events')
export class EventController {
    constructor(private readonly eventService: EventService) { }

    @Get()
    async findAll(): Promise<Event[]> {
        return this.eventService.findAllEvents();
    }

    @Get('recent')
    async findRecent(@Query('limit') limit?: number): Promise<Event[]> {
        return this.eventService.findRecentEvents(limit);
    }

    @Get('search')
    async search(@Query('q') query: string): Promise<Event[]> {
        return this.eventService.searchEvents(query);
    }

    @Get('active')
    async findActive(): Promise<Event[]> {
        return this.eventService.findEventsByStatus(true);
    }

    @Get('date-range')
    async findByDateRange(
        @Query('start') start: string,
        @Query('end') end: string,
    ): Promise<Event[]> {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return this.eventService.findEventsByDateRange(startDate, endDate);
    }

    @Get(':eventId')
    async findOne(@Param('eventId') eventId: string): Promise<Event | null> {
        return this.eventService.findEventById(eventId);
    }

    @Get(':eventId/markets')
    async findMarkets(@Param('eventId') eventId: string): Promise<Market[]> {
        return this.eventService.findMarketsByEventId(eventId);
    }

    @Get('markets/:marketId')
    async findMarket(@Param('marketId') marketId: string): Promise<Market | null> {
        return this.eventService.findMarketById(marketId);
    }
} 