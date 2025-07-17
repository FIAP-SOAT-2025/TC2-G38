import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/shared/infra/prisma.service';
import ItemGatewayInterface from 'src/arch_item/interfaces/itemGatewayInterface';
import { CreateItemInterface } from 'src/arch_item/interfaces/createItemInterface';
import { 
  ItemNotFoundError,
  CreateItemError,
  DeleteItemError
} from 'src/arch_item/entities/errors/item.errors';
import { mapRepositoryToItemEntity } from 'src/arch_item/infraestructure/persistence/mappers/mapRepositoryToItemEntity';
import Item from 'src/arch_item/entities/item.entity';
import ItemCategoryEnum from 'src/arch_item/entities/itemCategory.enum';
import { UpdateItemInterface } from 'src/arch_item/interfaces/updateItemInterface';


@Injectable()
export class PrismaItemRepository implements ItemGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(newItemData: CreateItemInterface): Promise<Item> {
    try {
      const createdRecord = await this.prisma.item.create({
        data: {
          name: newItemData.name,
          price: newItemData.price,
          images: newItemData.images,
          description: newItemData.description,
          quantity: newItemData.quantity,
          category: newItemData.category,
        },
      }); 
      const createdItem = mapRepositoryToItemEntity(createdRecord);

      return createdItem;
    } catch (error: any) {
      console.error('Error creating item:', error);
      throw new CreateItemError(error?.message || 'unknown error creating item');
    }
  }

  

  async findByCategory(typeCategory: ItemCategoryEnum): Promise<Item[]> {
   
    const items = await this.prisma.item.findMany({
      where: {
        category: typeCategory,
        isDeleted: false,
      },
    });

   
    return items.map(mapRepositoryToItemEntity);
  }

  async findByIdIfNotDeleted(
    itemId: string,
    isDeleted: boolean,
  ): Promise<Item> {
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId,
        isDeleted: isDeleted,
      },
    });

    if (!item) {
      throw new ItemNotFoundError(itemId);
    }
    return mapRepositoryToItemEntity(item);
  }

  async update(id: string, item: Partial<Item>): Promise<Item> {
    const updatedItem = await this.prisma.item.update({
      where: { id },
      data: {
        name: item.name,
        price: item.price,
        description: item.description,
        images: item.images,
        quantity: item.quantity,
        category: item.category,
        updatedAt: new Date(),
      },
    });
    return mapRepositoryToItemEntity(updatedItem);
  }

  async soft_delete(id: string): Promise<Item> {
    try {
      await this.cancelOrdersWithDeletedItems(id);

      const softDeletedItem = await this.prisma.item.update({
        where: { id },
        data: { isDeleted: true },
      });

      return mapRepositoryToItemEntity(softDeletedItem);
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as any).code === 'P2025'
      ) {
        throw new ItemNotFoundError(id);
      }
      console.error('Error soft deleting item:', error);
      throw new DeleteItemError(id, 'Failed to soft delete item');
    }
  }


  private async cancelOrdersWithDeletedItems(id: string): Promise<void> {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { itemId: id },
      select: { orderId: true },
    });

    if (orderItems.length > 0) {
      const orders = await this.prisma.order.findMany({
        where: { id: { in: orderItems.map((order) => order.orderId) } },
        select: { id: true, status: true },
      });

      const notCompletedOrders = orders.filter(
        (order) => order.status !== 'COMPLETED' && order.status !== 'CANCELLED',
      );

      if (notCompletedOrders.length > 0) {
        await this.prisma.order.updateMany({
          where: { id: { in: notCompletedOrders.map((order) => order.id) } },
          data: { status: OrderStatus.CANCELLED },
        });
      }
    }
  }

}
