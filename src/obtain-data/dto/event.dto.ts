import { Market } from '../entities/market.entity';

export class EventDto {
    id: number;
    eventId: string;
    ticker: string;
    slug: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    creationDate: Date;
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
    markets: Market[];
    createdAt: Date;
    updatedAt: Date;
}

export class MarketDto {
    id: number;
    marketId: string;
    eventId: string;
    question: string;
    conditionId: string;
    slug: string;
    startDate: Date;
    endDate: Date;
    description: string;
    outcomes: string[];
    outcomePrices: string[];
    liquidity: number;
    volume: number;
    active: boolean;
    closed: boolean;
    archived: boolean;
    featured: boolean;
    restricted: boolean;
    groupItemTitle: string;
    groupItemThreshold: string;
    questionId: string;
    volume24hr: number;
    volume1wk: number;
    volume1mo: number;
    volume1yr: number;
    competitive: number;
    createdAt: Date;
    updatedAt: Date;
} 