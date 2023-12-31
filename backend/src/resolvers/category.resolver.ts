import { Resolver, Query, Arg } from "type-graphql";
import { Category } from "../entities/category";
import * as CategoryService from '../services/category.service';

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    categories(@Arg("terms", { nullable : true }) terms: string): Promise<Category[]>{
        return CategoryService.getCategories(terms);
    }

}