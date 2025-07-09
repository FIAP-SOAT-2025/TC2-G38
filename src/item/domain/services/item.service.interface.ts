import { CreateItemDto } from '../dto/createItem.dto';
import { UpdateItemDto } from '../dto/updateItem.dto';
import Item from '../model/item.entity';
import ItemCategoryEnum from '../model/itemCategory.enum';

export interface CreateItemServiceInterface {
  create(item: CreateItemDto): Promise<Item>;
}

export interface UpdateItemServiceInterface {
  update(id: string, item: Partial<UpdateItemDto>): Promise<Item | null>;
  updateQuantity(id: string, quantity: number): Promise<Item>;
}

export interface FindItemServiceInterface {
  findByCategory(category: ItemCategoryEnum): Promise<Item[] | null>;
  findById(id: string): Promise<Item | null>;
}

export interface DeleteItemServiceInterface {
  delete(id: string): Promise<{ message: string }>;
}
