import { Test, TestingModule } from '@nestjs/testing';
import OrderRepository from '../domain/repository/order.repository';
import Order from '../domain/model/order.entity';
import FindOrderService from '../application/findOrder.service';
import { OrderMapper } from '../domain/mappings/mapEntityToResponseDto';

describe('FindOrderService', () => {
  let service: FindOrderService;
  let orderRepository: jest.Mocked<OrderRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindOrderService,
        {
          provide: 'OrderRepository',
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindOrderService>(FindOrderService);
    orderRepository = module.get('OrderRepository');
  });

  it('should find all orders successfully', async () => {
    const order = [
      new Order({
        customerId: '123',
        orderItems: [
          {
            itemId: 'item-id-1',
            quantity: 1,
            price: 12.5,
          },
          {
            itemId: 'item-id-2',
            quantity: 2,
            price: 15.0,
          },
        ],
      }),
    ];

    orderRepository.findAll.mockResolvedValue(order);

    const result = await service.findAll();

    expect(orderRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(
      order.map((o) => OrderMapper.mapOrderEntityToFindOrderResponse(o)),
    );
  });

  it('should find order successfully', async () => {
    const order = new Order({
      id: '3',
      customerId: '123',
      orderItems: [
        {
          itemId: 'item-id-1',
          quantity: 1,
          price: 12.5,
        },
        {
          itemId: 'item-id-2',
          quantity: 2,
          price: 15.0,
        },
      ],
    });

    orderRepository.findById.mockResolvedValue(order);

    const result = await service.find('3');

    expect(orderRepository.findById).toHaveBeenCalledWith('3');
    expect(result).toStrictEqual(
      OrderMapper.mapOrderEntityToFindOrderResponse(order),
    );
  });

  it('should return Error when findAll order repository fails', async () => {
    orderRepository.findAll.mockRejectedValue(
      new Error('Failed to find all orders'),
    );
    await expect(service.findAll()).rejects.toThrow(
      'Failed to find all orders',
    );
  });

  it('should return Error when order repository fails', async () => {
    orderRepository.findById.mockRejectedValue(
      new Error('Failed to find order'),
    );
    await expect(service.find('3')).rejects.toThrow('Failed to find order');
  });
});
