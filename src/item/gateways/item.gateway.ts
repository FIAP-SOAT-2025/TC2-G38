import Item from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { CreateItemInterface } from "../interfaces/createItemInterface";
import ItemGatewayInterface from "../interfaces/itemGatewayInterface";
import ItemRepositoryInterface from "../interfaces/ItemRepositoryInterface";

export class ItemGateway implements ItemGatewayInterface {

    constructor(private readonly itemRepository: ItemRepositoryInterface) {}
    
    async create(itemData: Item): Promise<Item> {
        const item = await this.itemRepository.create(itemData);
        return new Item(item);
    }
    
   async findByIdIfNotDeleted(id: string, isDelete: boolean): Promise<Item> {
       const item = await this.itemRepository.findByIdIfNotDeleted(id, isDelete);
       return new Item(item);
   }
    async update(id: string, item: Item): Promise<Item> {
       const itemUpdate =  await this.itemRepository.update(id, item);
         return new Item(itemUpdate);
    }
    async findByCategory(category: ItemCategoryEnum): Promise<Item[]> {
        const items = await this.itemRepository.findByCategory(category);
        return items.map(item => new Item(item));
    }
    async soft_delete(id: string): Promise<Item> {
        const item = await this.itemRepository.soft_delete(id);
        return new Item(item);
    }
    findByNameAndDescription(name: string, description: string): Promise<boolean> {
        return this.itemRepository.findByNameAndDescription(name, description);
    }

}