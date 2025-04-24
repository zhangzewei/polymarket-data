import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UmaResolutionStatus {
    @Field({ nullable: true })
    outcome: string;

    @Field({ nullable: true })
    status: string;

    @Field({ nullable: true })
    timestamp: string;
} 