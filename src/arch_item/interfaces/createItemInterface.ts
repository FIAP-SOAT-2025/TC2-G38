import ItemCategoryEnum from "../entities/itemCategory.enum";

export interface CreateItemInterface {
    name : string;
    description : string;
    images : string[];
    price : number;
    quantity : number;
    category : ItemCategoryEnum;
}