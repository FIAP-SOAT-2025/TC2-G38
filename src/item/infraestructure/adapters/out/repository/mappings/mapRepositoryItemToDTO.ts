import { Decimal } from '@prisma/client/runtime/library';
import Item from '../../../../../domain/model/item.entity';
import ItemCategoryEnum from '../../../../../domain/model/itemCategory.enum';
import { Item as PrismaItem } from '@prisma/client';

export function mapRepositoryToItemEntity(prismaItem: PrismaItem): Item {
  return new Item({
    id: prismaItem.id,
    name: prismaItem.name,
    description: prismaItem.description,
    images: prismaItem.images,
    price:
      prismaItem.price instanceof Decimal
        ? prismaItem.price.toNumber()
        : prismaItem.price,
    quantity: prismaItem.quantity,
    category: prismaItem.category as ItemCategoryEnum,
    createdAt: prismaItem.createdAt,
    updatedAt: prismaItem.updatedAt,
    isDeleted: prismaItem.isDeleted,
  });
}
