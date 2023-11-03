import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class SearchAdsArgs {
    @Field()
    categoryId?: number;

    @Field()
    search?: string;
}