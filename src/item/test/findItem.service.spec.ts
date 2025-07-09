import { Test, TestingModule } from '@nestjs/testing';
import ItemRepository from '../domain/repository/item.repository';
import FindItemService from '../application/services/findItem.service';
import ItemCategoryEnum from '../domain/model/itemCategory.enum';
import Item from '../domain/model/item.entity';
import { BadRequestException } from '@nestjs/common';

describe('FindItemService', () => {
  let service: FindItemService;
  let repository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindItemService,
        {
          provide: 'ItemRepository',
          useValue: {
            findByCategory: jest.fn(),
            findByIdIfNotDeleted: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindItemService>(FindItemService);
    repository = module.get('ItemRepository');
  });

  it('should find Items by Category successfully', async () => {
    const category = ItemCategoryEnum.BEVERAGE;
    const items = [
      new Item({
        id: '1',
        name: 'Coke',
        description: 'Coke zero',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: category,
      }),
    ];

    repository.findByCategory.mockResolvedValue(items);

    const result = await service.findByCategory(category);

    expect(result).toEqual(items);
    expect(repository.findByCategory).toHaveBeenCalledWith(category);
  });

  it('should find items by Id successfully', async () => {
    const category = ItemCategoryEnum.BEVERAGE;
    const item = [
      new Item({
        id: '5ba023a4-b988-4749-8ec7-8794b171d665',
        name: 'Coke',
        description: 'Coke zero',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: category,
      }),
    ];

    repository.findByIdIfNotDeleted = jest.fn().mockResolvedValue(item[0]);

    const result = await service.findById(item[0].id!);

    expect(result).toEqual(item[0]);
    expect(repository.findByIdIfNotDeleted).toHaveBeenCalledWith(
      item[0].id,
      false,
    );
  });

  it('should throw BadRequestException with expected message for invalid category', async () => {
    const invalidCategory = 'INVALID_CATEGORY' as ItemCategoryEnum;
    const validCategories = Object.values(ItemCategoryEnum).join(', ');

    await expect(service.findByCategory(invalidCategory)).rejects.toThrow(
      `Invalid category. Expected values: ${validCategories}`,
    );
  });
});
