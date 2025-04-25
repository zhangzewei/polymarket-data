import { ObjectType, Field } from '@nestjs/graphql';

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

    @Field()
    bestBid: string;

    @Field()
    bestAsk: string;
} 