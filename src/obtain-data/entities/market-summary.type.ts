import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class MarketSummary {
    @Field()
    slug: string;

    @Field(() => [String])
    outcomes: string[];

    @Field(() => [String])
    outcomePrices: string[];

    @Field()
    active: boolean;

    @Field()
    groupItemTitle: string;

    @Field(() => Float)
    bestBid: number;

    @Field(() => Float)
    bestAsk: number;
} 