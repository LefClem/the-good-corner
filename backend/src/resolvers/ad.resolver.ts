import { Resolver, Query, Arg, Mutation, Authorized, Ctx } from "type-graphql";
import { Ad } from "../entities/ad";
import * as AdService from '../services/ad.service'
import { SearchAdsArgs } from "../types/SearchAdsArgs";
import { DeleteResult } from "typeorm";
import { CreateAdInputType } from "../types/CreateAdInputType";
import { UpdateAdInputType } from "../types/UpdateAdInputType";
import { Context } from "apollo-server-core";


@Resolver(Ad)
export class AdResolver {
    @Query(() => [Ad])
    @Authorized()
    ads(
        @Arg("search", { nullable: true }) search: string,
        @Arg("categoryId", { nullable: true }) categoryId: number,
        @Ctx() ctx: Context
    ): Promise<Ad[]> {
        console.log(ctx)
        return AdService.search(categoryId, search);
    }

    @Query(() => Ad)
    getAd(@Arg("id") id: number): Promise<Ad | null> {
        return AdService.findAdById(id);
    }

    @Authorized()
    @Mutation(() => String)
    async deleteAd(
        @Arg("id") id: number,
        @Ctx() ctx: Context | any
    ): Promise<string> {
        const ad = await AdService.findAdById(id);        
        if(ad?.owner !== ctx.user.email && ctx.user.roles !== "ADMIN"){
            return "Not authorized"
        } 
        
        await AdService.deleteAd(id);
        return "Annonce supprimée";
    }

    @Mutation(() => Ad)
    @Authorized()
    createAd(
        @Arg("ad") ad: CreateAdInputType,
        @Ctx() ctx: Context
    ): Promise<Ad> {
        return AdService.create({ ...ad }, ctx);
    }

    @Authorized()
    @Mutation(() => Ad)
    updateAd(@Arg("ad") ad: UpdateAdInputType, @Arg("categoryId") categoryId: number, @Ctx() ctx: Context | any): Promise<Ad | undefined> {

        return AdService.update(ad.id, { ...ad } as Ad, categoryId, ctx)
    }

}