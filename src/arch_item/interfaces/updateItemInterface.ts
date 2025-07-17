import ItemCategoryEnum from "../entities/itemCategory.enum";

export interface UpdateItemInterface {
    name : string;
    description : string;
    images : string[];
    price : number;
    quantity : number;
    category : ItemCategoryEnum;
}