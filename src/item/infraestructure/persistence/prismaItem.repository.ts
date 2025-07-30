import { Injectable } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { PrismaService } from 'src/shared/infra/prisma.service';
import ItemGatewayInterface from 'src/item/interfaces/itemGatewayInterface';
import { CreateItemInterface } from 'src/item/interfaces/createItemInterface';
import Item from 'src/item/entities/item.entity';
import ItemCategoryEnum from 'src/item/entities/itemCategory.enum';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

@Injectable()
export class PrismaItemRepository implements ItemGatewayInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(newItemData: CreateItemInterface): Promise<any> {
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
      

      return createdRecord;
    } catch (error: any) {
      throw new BaseException(`Failed to create item: ${error.message}`, 500, 'ITEM_CREATION_ERROR');
    }
  }

  

  async findByCategory(typeCategory: ItemCategoryEnum): Promise<any> {
   try {
    const items = await this.prisma.item.findMany({
      where: {
        category: typeCategory,
        isDeleted: false,
      },
    });

   
    return items;
  } catch (error: any) {
    throw new BaseException(`Failed to find items by category: ${error.message}`, 500, 'ITEM_CATEGORY_ERROR');
   }
  }

  async findByNameAndDescription(name: string, description: string): Promise<boolean> {
    const itemRecord = await this.prisma.item.findFirst({
      where: {
        name,
        description,
        isDeleted: false,
      },
    });
    if (!itemRecord) {
      return false;
    }

    return true;
  }

  async findByIdIfNotDeleted(
    itemId: string,
    isDeleted: boolean,
  ): Promise<any> {
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId,
        isDeleted: isDeleted,
      },
    });

    if (!item) {
      throw new BaseException(`Failed to find item by ID: ${itemId}`, 404, 'ITEM_NOT_FOUND');
    }
    return item;
  }

  async update(id: string, item: Partial<Item>): Promise<any> {

    try {
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
      return updatedItem;
    } catch (error: any) {
      throw new BaseException(`Failed to update item: ${error.message}`, 500, 'ITEM_UPDATE_ERROR');
    }
  }

 async soft_delete(id: string): Promise<any> {
    try {
      await this.cancelOrdersWithDeletedItems(id);

      const softDeletedItem = await this.prisma.item.update({
        where: { id },
        data: { isDeleted: true },
      });

      return softDeletedItem;
    } catch (error) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        (error as any).code === 'P2025'
      ) {
        throw new BaseException(`Item not found: ${id}`, 404, 'ITEM_NOT_FOUND');
      }
      console.error('Error soft deleting item:', error);
      throw new BaseException(`Failed to soft delete item`, 500, 'ITEM_SOFT_DELETE_ERROR');
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
