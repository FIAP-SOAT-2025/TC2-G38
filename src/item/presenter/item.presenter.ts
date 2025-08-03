import Item, { ItemProps } from "../entities/item.entity";

export class ItemPresenter {
  static toResponse(item: Item): ItemProps {
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