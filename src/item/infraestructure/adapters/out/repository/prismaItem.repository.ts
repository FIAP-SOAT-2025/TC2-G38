import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import ItemRepository from '../../../../domain/repository/item.repository';
import Item from '../../../../domain/model/item.entity';
import { mapRepositoryToItemEntity } from './mappings/mapRepositoryItemToDTO';
import { PrismaService } from '../../../../../shared/infra/prisma.service';
import ItemCategoryEnum from 'src/item/domain/model/itemCategory.enum';
import { OrderStatus } from '@prisma/client';
import { CreateItemDto } from 'src/item/domain/dto/createItem.dto';
import { UpdateItemDto } from 'src/item/domain/dto/updateItem.dto';

@Injectable()
export class PrismaItemRepository implements ItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(newItemData: CreateItemDto): Promise<Item> {
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
    } catch (error) {
      console.error('Error creating item:', error);
      throw new Error('Failed to create item');
    }
  }

  async findById(id: string): Promise<Item | null> {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with id "${id}" not found`);
    }

    return mapRepositoryToItemEntity(item);
  }

  async findByCategory(typeCategory: ItemCategoryEnum): Promise<Item[] | null> {
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
  ): Promise<Item | null> {
    const item = await this.prisma.item.findFirst({
      where: {
        id: itemId,
        isDeleted: isDeleted,
      },
    });

    if (!item) {
      throw new BadRequestException(`Failed to find item with id "${itemId}"`);
    }
    return mapRepositoryToItemEntity(item);
  }

  async update(id: string, item: Partial<UpdateItemDto>): Promise<Item> {
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
        throw new NotFoundException(`Item with id "${id}" not found `);
      }
      console.error('Error soft deleting item:', error);
      throw new Error('Failed to soft delete item');
    }
  }

  async findAll(): Promise<Item[]> {
    // Implement the logic to find all items using Prisma
    return [];
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
