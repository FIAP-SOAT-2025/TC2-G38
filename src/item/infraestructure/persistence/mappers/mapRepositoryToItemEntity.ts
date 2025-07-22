import { Decimal } from '@prisma/client/runtime/library';
import Item from '../../../entities/item.entity'
import { Item as PrismaItem } from '@prisma/client';
import ItemCategoryEnum from 'src/item/entities/itemCategory.enum';

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
