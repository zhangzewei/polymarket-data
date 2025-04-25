import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { EventService } from '../services/event.service';
import { Event } from '../entities/event.entity';
import { Market } from '../entities/market.entity';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

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
    async findEventsByDateRange(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ): Promise<Event[]> {
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

    @Get(':eventId/market-price-history/download-csv')
    async downloadMarketPriceHistory(
        @Param('eventId') eventId: string,
        @Res() res: Response
    ) {
        try {
            const marketPriceHistories = await this.eventService.getMarketPriceHistoryForEvent(eventId);

            // Create temporary directory if it doesn't exist
            const tempDir = path.join(os.tmpdir(), 'polymarket-data');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }

            // Generate CSV file
            const fileName = `market-price-history-${eventId}-${Date.now()}.csv`;
            const filePath = path.join(tempDir, fileName);

            // Create CSV content with new fields
            let csvContent = 'Event Slug,Market Slug,Group Item Title,Active,Outcomes,Outcome Prices,Timestamp,Best Bid,Best Ask\n';
            marketPriceHistories.forEach(market => {
                market.priceHistories.forEach(history => {
                    csvContent += `${market.eventSlug},${market.marketSlug},"${market.groupItemTitle}",${market.active},"${market.outcomes.join(';')}","${market.outcomePrices.join(';')}",${history.createdAt},${history.bestBid},${history.bestAsk}\n`;
                });
            });

            // Write to file
            fs.writeFileSync(filePath, csvContent);

            // Set response headers
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

            // Send file
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
                // Delete file after sending
                fs.unlinkSync(filePath);
            });
        } catch (error) {
            console.error('Error downloading market price history:', error);
            res.status(500).json({ error: 'Failed to download market price history' });
        }
    }
} 