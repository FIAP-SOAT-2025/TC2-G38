import Item, { ItemProps } from "../entities/item.entity";


export class CategoryPresenter {
  static toResponse(items: Item[]): ItemProps[] {    
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