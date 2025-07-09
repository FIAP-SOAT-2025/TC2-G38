import { Test, TestingModule } from '@nestjs/testing';
import { PrismaItemRepository } from '../infraestructure/adapters/out/repository/prismaItem.repository';
import Item from '../domain/model/item.entity';
import ItemCategoryEnum from '../domain/model/itemCategory.enum';
import { PrismaService } from '../../shared/infra/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('PrismaItemRepository', () => {
  let repository: PrismaItemRepository;
  let prismaService: jest.Mocked<PrismaService>;
  const mockDate = new Date('2025-05-10T01:47:30.199Z');

  beforeEach(async () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaItemRepository,
        {
          provide: PrismaService,
          useValue: {
            item: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findMany: jest.fn(),
              findByIdIfNotDeleted: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    repository = module.get<PrismaItemRepository>(PrismaItemRepository);
    prismaService = module.get(PrismaService);
  });

  it('should create an item successfully', async () => {
    const createdItem = new Item({
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
      createdAt: mockDate,
      updatedAt: mockDate,
    });

    const newItemDto = {
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
    };

    (prismaService.item.create as jest.Mock).mockResolvedValue(createdItem);

    const result = await repository.create(newItemDto);

    expect(prismaService.item.create).toHaveBeenCalledWith({
      data: {
        name: newItemDto.name,
        description: newItemDto.description,
        images: newItemDto.images,
        price: newItemDto.price,
        quantity: newItemDto.quantity,
        category: newItemDto.category,
      },
    });

    expect(result).toEqual(
      new Item({
        name: createdItem.name,
        description: createdItem.description,
        images: createdItem.images,
        price: createdItem.price,
        quantity: createdItem.quantity,
        category: createdItem.category,
        id: createdItem.id,
        createdAt: createdItem.createdAt,
        updatedAt: createdItem.updatedAt,
      }),
    );
  });

  it(`should handle errors when creating an item`, async () => {
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const newItem = new Item({
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
    });

    const error = new Error('Database error');

    (prismaService.item.create as jest.Mock).mockRejectedValue(error);

    await expect(repository.create(newItem)).rejects.toThrow(
      'Failed to create item',
    );

    expect(prismaService.item.create).toHaveBeenCalledWith({
      data: {
        name: newItem.name,
        description: newItem.description,
        images: newItem.images,
        price: newItem.price,
        quantity: newItem.quantity,
        category: newItem.category,
      },
    });
  });

  it('should find an item by Category successfully', async () => {
    const items = [
      {
        id: '1',
        name: 'Coke',
        description: 'Coke zero',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: ItemCategoryEnum.BEVERAGE,
        isDeleted: false,
      },
      {
        id: '2',
        name: 'X-Burguer',
        description: 'with cheese',
        images: ['https://placehold.co/600x400'],
        price: 10.0,
        quantity: 100,
        category: ItemCategoryEnum.SANDWICH,
        isDeleted: false,
      },
    ];

    (prismaService.item.findMany as jest.Mock).mockResolvedValue(
      items.filter((item) => item.category === ItemCategoryEnum.BEVERAGE),
    );

    const result = await repository.findByCategory(ItemCategoryEnum.BEVERAGE);

    expect(result).toEqual([
      new Item({
        id: '1',
        name: 'Coke',
        description: 'Coke zero',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: ItemCategoryEnum.BEVERAGE,
        isDeleted: false,
      }),
    ]);

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        category: ItemCategoryEnum.BEVERAGE,
        isDeleted: false,
      },
    });
  });

  it('should handle errors when finding items by Category', async () => {
    const error = new Error('Database error');

    (prismaService.item.findMany as jest.Mock).mockRejectedValue(error);

    await expect(
      repository.findByCategory(ItemCategoryEnum.BEVERAGE),
    ).rejects.toThrow('Database error');

    expect(prismaService.item.findMany).toHaveBeenCalledWith({
      where: {
        category: ItemCategoryEnum.BEVERAGE,
        isDeleted: false,
      },
    });
  });

  it('should find an item by Id successfully', async () => {
    const prismaItem = new Item({
      id: '1',
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (prismaService.item.findUnique as jest.Mock).mockResolvedValue(prismaItem);

    const result = await repository.findById(prismaItem.id!);

    expect(result).toEqual(prismaItem);

    expect(prismaService.item.findUnique).toHaveBeenCalledWith({
      where: { id: prismaItem.id },
    });
  });

  it('should throw NotFoundException when item is not found by Id', async () => {
    (prismaService.item.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(repository.findById('not-found-id')).rejects.toThrow(
      NotFoundException,
    );

    expect(prismaService.item.findUnique).toHaveBeenCalledWith({
      where: { id: 'not-found-id' },
    });
  });
  it('should return the item if found and not deleted', async () => {
    const prismaItem = {
      id: '1',
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
      isDeleted: false,
      createdAt: mockDate,
      updatedAt: mockDate,
    };

    (prismaService.item.findFirst as jest.Mock).mockResolvedValue(prismaItem);

    const result = await repository.findByIdIfNotDeleted(prismaItem.id, false);

    expect(result).toEqual(new Item(prismaItem));
    expect(prismaService.item.findFirst).toHaveBeenCalledWith({
      where: { id: prismaItem.id, isDeleted: false },
    });
  });
});
