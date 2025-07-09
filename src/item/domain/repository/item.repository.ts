import { CreateItemDto } from 'src/item/domain/dto/createItem.dto';
import Item from '../model/item.entity';
import ItemCategoryEnum from '../model/itemCategory.enum';

export default interface ItemRepository {
  create(item: CreateItemDto): Promise<Item>;
  findById(id: string): Promise<Item | null>;
  findByCategory(category: ItemCategoryEnum): Promise<Item[] | null>;
  findByIdIfNotDeleted(id: string, isDelete: boolean): Promise<Item | null>;
  update(id: string, item: Item): Promise<Item>;
  soft_delete(id: string): Promise<Item>;
  findAll(): Promise<Item[]>;
}
