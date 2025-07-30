import Item, { ItemProps } from "../entities/item.entity";
import ItemCategoryEnum from "../entities/itemCategory.enum";
import { CreateItemInterface } from "./createItemInterface";

export default interface ItemRepositoryInterface {
  create(item: Item): Promise<ItemProps>;
  findByIdIfNotDeleted(id: string, isDelete: boolean): Promise<ItemProps>;
  update(id: string, item: Item): Promise<ItemProps>;
  findByCategory(category: ItemCategoryEnum): Promise<ItemProps[]>;
  soft_delete(id: string): Promise<ItemProps>;
  findByNameAndDescription(name: string, description: string): Promise<boolean>;
}
