import Item from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";

export class ItemGateway implements ItemGatewayInterface {

    constructor(private readonly itemRepository: ItemGatewayInterface) {}
    
    async create(itemData: CreateItemInterface): Promise<Item> {
        const item = await this.itemRepository.create(itemData);
        return item;
    }
    
   async findByIdIfNotDeleted(id: string, isDelete: boolean): Promise<Item> {
        return this.itemRepository.findByIdIfNotDeleted(id, isDelete);
    }
    async update(id: string, item: Item): Promise<Item> {
       const itemUpdate =  await this.itemRepository.update(id, item);
         return new Item(itemUpdate);
    }
    async findByCategory(category: ItemCategoryEnum): Promise<Item[]>{
        return this.itemRepository.findByCategory(category);
    }
    async soft_delete(id: string): Promise<Item> {
        return this.itemRepository.soft_delete(id);
    }
}