import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Ad } from "../entities/ad";
import * as AdService from '../services/ad.service'
import { SearchAdsArgs } from "../types/SearchAdsArgs";
import { DeleteResult } from "typeorm";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { UpdateAdInputType } from "../types/UpdateAdInputType";

@Resolver(Ad)
export class AdResolver {
    @Query(() => [Ad])
    ads(
        @Arg("search", { nullable: true }) search: string,
        @Arg("categoryId", { nullable: true }) categoryId: number
    ): Promise<Ad[]> {
        return AdService.search(categoryId, search);
    }
    
    @Query(() => Ad)
    getAd(@Arg("id") id: number): Promise<Ad | null>{
        return AdService.findAdById(id);
    }

    @Mutation(() => String)
    async deleteAd(@Arg("id") id: number): Promise<string>{
        await AdService.deleteAd(id);        
        return "Annonce supprimée";
    }

    @Mutation(() => Ad)
    createAd(@Arg("ad") ad: CreateAdInputType): Promise<Ad>{
        return AdService.create({...ad});
    }

    @Mutation(() => Ad)
    updateAd(@Arg("ad") ad: UpdateAdInputType, @Arg("categoryId") categoryId: number): Promise<Ad | undefined> {
            return AdService.update(ad.id, {...ad} as Ad, categoryId)
        }
    
}