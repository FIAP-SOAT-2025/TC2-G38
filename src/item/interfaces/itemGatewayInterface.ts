import Item from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { CreateItemInterface } from "./createItemInterface";

export default interface ItemGatewayInterface {
  create(item: CreateItemInterface): Promise<Item>;
  findByIdIfNotDeleted(id: string, isDelete: boolean): Promise<Item>;
  update(id: string, item: Item): Promise<Item>;
  findByCategory(category: ItemCategoryEnum): Promise<Item[]>;
  soft_delete(id: string): Promise<Item>;
  findByNameAndDescription(name: string, description: string): Promise<boolean>;
}
