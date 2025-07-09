import { Test, TestingModule } from '@nestjs/testing';
import Item from 'src/item/domain/model/item.entity';
import ItemCategoryEnum from 'src/item/domain/model/itemCategory.enum';
import OrderRepository from '../domain/repository/order.repository';
import { OrderDto } from '../domain/dto/order.dto';
import Order from '../domain/model/order.entity';
import { OrderStatusEnum } from '../domain/model/orderStatus';
import UpdateOrderService from '../application/updateOrder.service';
import UpdateItemService from 'src/item/application/services/updateItem.service';
import { NotFoundException } from '@nestjs/common';

describe('UpdateOrderService', () => {
  let service: UpdateOrderService;
  let orderRepository: jest.Mocked<OrderRepository>;
  let itemService: jest.Mocked<UpdateItemService>;
  let item_1: Item;
  let orderDTO: OrderDto;
  let order: Order;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderService,
        {
          provide: 'OrderRepository',
          useValue: {
            findById: jest.fn(),
            updateStatus: jest.fn(),
          },
        },
        {
          provide: 'UpdateItemServiceInterface',
          useValue: {
            updateQuantity: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateOrderService>(UpdateOrderService);
    orderRepository = module.get('OrderRepository');
    itemService = module.get('UpdateItemServiceInterface');

    item_1 = new Item({
      id: 'item-id-1',
      name: 'Coke',
      description: 'Coke zero',
      price: 10.5,
      quantity: 100,
      images: ['image1', 'image2'],
      category: ItemCategoryEnum.BEVERAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    orderDTO = {
      orderItems: [
        {
          itemId: 'item-id-1',
          itemQuantity: 2,
        },
        {
          itemId: 'item-id-2',
          itemQuantity: 10,
        },
      ],
    };

    order = new Order({
      customerId: 'customer-id',
      orderItems: [
        {
          itemId: orderDTO.orderItems[0].itemId,
          quantity: orderDTO.orderItems[0].itemQuantity,
          price: item_1.price,
        },
      ],
    });
  });

  it('should update an order successfully', async () => {
    orderRepository.findById.mockResolvedValue(order);
    orderRepository.updateStatus.mockResolvedValue(order);
    itemService.updateQuantity.mockResolvedValue(item_1);

    const result = await service.updateStatus(
      order.id,
      OrderStatusEnum.RECEIVED,
    );
    expect(result).toEqual({
      message: `Order with ID ${order.id} updated successfully`,
    });

    expect(orderRepository.findById).toHaveBeenCalledWith(order.id);
    expect(orderRepository.updateStatus).toHaveBeenCalledWith(
      order.id,
      OrderStatusEnum.RECEIVED,
    );
    expect(itemService.updateQuantity).toHaveBeenCalledWith(
      order.orderItems[0]._itemId,
      order.orderItems[0]._quantity,
    );
  });

  it('should return NotFoundException when Order does not exist', async () => {
    orderRepository.findById.mockRejectedValue(
      new NotFoundException(`Order with ID ${order.id} not found`),
    );

    await expect(
      service.updateStatus(order.id, OrderStatusEnum.RECEIVED),
    ).rejects.toThrow(
      new NotFoundException(`Order with ID ${order.id} not found`),
    );

    expect(orderRepository.updateStatus).not.toHaveBeenCalled();
    expect(itemService.updateQuantity).not.toHaveBeenCalled();
  });
});
