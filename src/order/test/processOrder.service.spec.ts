import { Test, TestingModule } from '@nestjs/testing';
import Item from 'src/item/domain/model/item.entity';
import ItemCategoryEnum from 'src/item/domain/model/itemCategory.enum';
import ItemRepository from 'src/item/domain/repository/item.repository';
import ProcessOrderService from '../application/processOrder.service';
import OrderRepository from '../domain/repository/order.repository';
import CustomerRepository from 'src/customer/domain/repository/customer.repository';
import { OrderDto } from '../domain/dto/order.dto';
import { Customer } from 'src/customer/domain/model/customer.entity';
import Order from '../domain/model/order.entity';
import { OrderStatusEnum } from '../domain/model/orderStatus';
import { OrderDomainError } from '../domain/model/exceptions/order.exception';
import { CreatePaymentService } from '../../payments/application/payment.service';

describe('ProcessOrderService', () => {
  let service: ProcessOrderService;
  let orderRepository: jest.Mocked<OrderRepository>;
  let itemRepository: jest.Mocked<ItemRepository>;
  let createPaymentService: jest.Mocked<CreatePaymentService>;
  let customerRepository: jest.Mocked<CustomerRepository>;
  let customer: Customer;
  let item_1: Item;
  let item_2: Item;
  let orderDTO: OrderDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessOrderService,
        {
          provide: 'ItemRepository',
          useValue: {
            findByIdIfNotDeleted: jest.fn(),
          },
        },
        {
          provide: 'OrderRepository',
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: 'CustomerRepository',
          useValue: {
            findByCpf: jest.fn(),
          },
        },
        {
          provide: 'CreatePaymentServiceInterface',
          useValue: {
            createPayment: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProcessOrderService>(ProcessOrderService);
    orderRepository = module.get('OrderRepository');
    itemRepository = module.get('ItemRepository');
    customerRepository = module.get('CustomerRepository');
    createPaymentService = module.get('CreatePaymentServiceInterface');

    customer = new Customer({
      id: 'customer-id',
      name: 'John Doe',
      email: 'test.com',
      cpf: '12345678900',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
      isDeleted: false,
    });

    item_2 = new Item({
      id: 'item-id-2',
      name: 'Burguer',
      description: 'Burguer with cheese',
      price: 30,
      images: ['image1', 'image2'],
      quantity: 200,
      category: ItemCategoryEnum.SANDWICH,
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    });

    orderDTO = {
      customerCpf: customer.cpf,
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
  });

  it('should create an order successfully', async () => {
    const order = new Order({
      customerId: 'customer-id',
      orderItems: [
        {
          itemId: orderDTO.orderItems[0].itemId,
          quantity: orderDTO.orderItems[0].itemQuantity,
          price: item_1.price,
        },
        {
          itemId: orderDTO.orderItems[1].itemId,
          quantity: orderDTO.orderItems[1].itemQuantity,
          price: item_2.price,
        },
      ],
    });

    customerRepository.findByCpf.mockResolvedValue(customer);
    orderRepository.create.mockResolvedValue(order);

    itemRepository.findByIdIfNotDeleted
      .mockImplementationOnce(async () => item_1)
      .mockImplementationOnce(async () => item_2);

    const result = await service.process(orderDTO);

    expect(result.order.customerId).toEqual(customer.id);
    expect(result.order.id).toBeDefined();
    expect(result.order.status).toEqual(OrderStatusEnum.PENDING);
    expect(createPaymentService.createPayment).toHaveBeenCalledWith(
      result.order.id,
      result.order.totalAmount,
    );
    expect(order.price).toEqual(
      item_1.price * orderDTO.orderItems[0].itemQuantity +
        item_2.price * orderDTO.orderItems[1].itemQuantity,
    );
    expect(result.order.totalAmount).toEqual(order.price);
    expect(order.orderItems[0]._orderId).toEqual(order.orderItems[1]._orderId);
  });

  it('should return NotFoundException when Customer does not exist', async () => {
    customerRepository.findByCpf.mockRejectedValue(
      new OrderDomainError(
        `NotFoundException: Failed to create order: Customer with ID ${customer.id} does not exist`,
      ),
    );

    await expect(service.process(orderDTO)).rejects.toThrow(
      `Failed to create order: Customer with cpf ${customer.cpf} does not exist`,
    );
  });

  it('should return NotFoundException when Item does not exist', async () => {
    itemRepository.findByIdIfNotDeleted.mockResolvedValue(null);

    await expect(service.process(orderDTO)).rejects.toThrow(
      `Failed to create order: Item with ID ${item_1.id} does not exist`,
    );
  });

  it('should return Error when item quantity is less than orderItem quantity', async () => {
    orderDTO.orderItems[0].itemQuantity = 1000;

    customerRepository.findByCpf.mockResolvedValue(customer);
    itemRepository.findByIdIfNotDeleted.mockResolvedValue(item_1);

    await expect(service.process(orderDTO)).rejects.toThrow(
      `Failed to create order: Item with ID ${orderDTO.orderItems[0].itemId} does not have enough quantity. Quantity: ${item_1.quantity}`,
    );
  });

  it('should return Error when orderItem has quantity equal 0', async () => {
    orderDTO.orderItems[0].itemQuantity = 0;

    customerRepository.findByCpf.mockResolvedValue(customer);
    itemRepository.findByIdIfNotDeleted.mockResolvedValue(item_1);

    await expect(service.process(orderDTO)).rejects.toThrow(
      `Invalid item price or quantity. Price: ${item_1.price}, Quantity: ${orderDTO.orderItems[0].itemQuantity}`,
    );
  });

  it('should return Error when orderItems are empty', async () => {
    orderDTO.orderItems = [];

    customerRepository.findByCpf.mockResolvedValue(customer);
    itemRepository.findByIdIfNotDeleted.mockResolvedValue(item_1);

    await expect(service.process(orderDTO)).rejects.toThrow(
      'No order items provided',
    );
  });

  it('should return Error when orderItems have the same id', async () => {
    orderDTO.orderItems = [...orderDTO.orderItems, ...orderDTO.orderItems];

    customerRepository.findByCpf.mockResolvedValue(customer);
    itemRepository.findByIdIfNotDeleted.mockResolvedValue(item_1);

    await expect(service.process(orderDTO)).rejects.toThrow(
      'Failed to create order: Order items must be unique. Found duplicate item IDs in order Items.',
    );
  });
});
