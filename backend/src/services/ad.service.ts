import { Ad } from "../entities/ad";
import { DeleteResult, Like } from "typeorm";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

export function findAdById(id: number): Promise<Ad | null>{
    return Ad.findOne({
        relations: {
          category: true,
          tags: true,
        },
        where: { id: id },
      });
}

export function search(categoryId: number | undefined = undefined, search: string = ''): Promise<Ad[]>{
    if(categoryId){
        return Ad.find({
            relations: {
                category : true
            }, 
            where: {
                category: {
                    id : categoryId
                },
                title: Like(`%${search}%`)
            }
        });
    } else {
        return Ad.find({
            relations: {
                category : true
            },
            where: {
                title: Like(`%${search}%`)
            }
        })        
    }
}

export async function create(adsData: {
    title: string, 
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    categoryId: number,
    tags: string[]
  }): Promise<Ad> {
    const ad = new Ad(adsData);
    const category = await Category.findOneBy({id: adsData.categoryId});
  
    if (category) {
      ad.category = category;
    }
  
    if (adsData.tags && adsData.tags.length > 0) {
      const tagsEntities: Tag[] = [];
      for (const tagName of adsData.tags) {
        let tag = await Tag.findOneBy({name: tagName});
        if (!tag) {
          tag = new Tag();
          tag.name = tagName;
        }
  
        tagsEntities.push(tag);
      }
  
      console.log(tagsEntities);
      ad.tags = tagsEntities;
    }
  
    return ad.save();
  }

export async function update(id: number, ad: Ad, categoryId: number): Promise<Ad | undefined>{
    const adToUpdate = await findAdById(id);

    if(!adToUpdate){
        throw new Error("Ad not found");
    }

    if(adToUpdate){
        adToUpdate.title = ad.title;
        adToUpdate.description = ad.description;
        adToUpdate.owner = ad.owner;
        adToUpdate.price = ad.price;
        adToUpdate.picture = ad.picture;
        adToUpdate.location = ad.location;
        adToUpdate.category = ad.category;
    }

    const category = await Category.findOneBy({id: categoryId});
    if(category){
        adToUpdate.category = category;
    }    
    return adToUpdate.save();
}

export function deleteAd(id: number): Promise<string | DeleteResult> { 
    return Ad.delete({id : id});
}