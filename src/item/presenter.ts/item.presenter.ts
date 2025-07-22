import Item from "../entities/item.entity";
import { ItemResponse } from "../infraestructure/api/dto/itemResponse.dto";

export class ItemPresenter {
  static toResponse(item: Item): ItemResponse {
    return {
      id: item.id ?? "" ,
      name: item.name ,
      description: item.description,
      price: item.price,
      quantity: item.quantity,
      images: item.images,
      category: item.category,
      updatedAt: item.updatedAt,
      createdAt: item.createdAt,
      isDeleted: item.isDeleted
    };
  }
}