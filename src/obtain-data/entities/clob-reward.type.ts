import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class ClobReward {
    @Field({ nullable: true })
    tokenId: string;

    @Field(() => Float, { nullable: true })
    amount: number;

    @Field({ nullable: true })
    currency: string;
} 