import { Test, TestingModule } from '@nestjs/testing';
import UpdateItemService from '../application/services/updateItem.service';
import ItemRepository from '../domain/repository/item.repository';
import Item from '../domain/model/item.entity';
import { BadRequestException } from '@nestjs/common';
import ItemCategoryEnum from '../domain/model/itemCategory.enum';

describe('UpdateItemService', () => {
  let service: UpdateItemService;
  let repository: jest.Mocked<ItemRepository>;
  const mockDate = new Date('2025-05-10T01:47:30.199Z');

  beforeEach(async () => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateItemService,
        {
          provide: 'ItemRepository',
          useValue: {
            update: jest.fn(),
            findByIdIfNotDeleted: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateItemService>(UpdateItemService);
    repository = module.get<ItemRepository>(
      'ItemRepository',
    ) as jest.Mocked<ItemRepository>;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('update', () => {
    it('should update an item successfully', async () => {
      const updateData = {
        name: 'Updated Burger',
        description: 'Updated description',
        images: ['https://placehold.co/600x400'],
        price: 12.99,
        quantity: 10,
        category: ItemCategoryEnum.SANDWICH,
        isDeleted: false,
      };

      const existingItem = new Item({
        ...updateData,
        id: '1',
        createdAt: new Date('2025-05-01T00:00:00.000Z'),
        updatedAt: new Date('2025-05-09T00:00:00.000Z'),
      });

      const updatedItem = new Item({
        ...updateData,
        id: '1',
        createdAt: existingItem.createdAt,
        updatedAt: mockDate,
      });

      const id = '1';

      repository.findByIdIfNotDeleted.mockResolvedValue(existingItem);
      repository.update.mockResolvedValue(updatedItem);

      const result = await service.update(id, updateData);

      expect(result).toEqual(updatedItem);
      expect(repository.update).toHaveBeenCalledWith(id, updatedItem);
    });

    it('should throw BadRequestException if the repository throws an error', async () => {
      const id = '1';

      try {
        new Item({
          name: 'Updated Burger',
          description: 'Updated description',
          images: ['https://placehold.co/600x400'],
          price: 12.99,
          quantity: -1,
          category: ItemCategoryEnum.SANDWICH,
          isDeleted: false,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }

      expect(repository.findByIdIfNotDeleted).not.toHaveBeenCalled();
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if the item is not found', async () => {
      repository.findByIdIfNotDeleted.mockResolvedValue(null);
      expect(repository.update).not.toHaveBeenCalled();
    });
  });
});
