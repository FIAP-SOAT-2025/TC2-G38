import Item from "../entities/item.entity";
import { ItemResponse } from "../infraestructure/api/dto/itemResponse.dto";

export class CategoryPresenter {
  static toResponse(items: Item[]): ItemResponse[] {    
    return items.map(item => ({
      id: item.id ?? "",
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      images: item.images,
      category: item.category,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      isDeleted: item.isDeleted
    }));
  }
}  