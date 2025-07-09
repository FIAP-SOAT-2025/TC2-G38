import { Test, TestingModule } from '@nestjs/testing';
import CreateItemService from '../application/services/createItem.service';
import ItemRepository from '../domain/repository/item.repository';
import ItemCategoryEnum from '../domain/model/itemCategory.enum';
import Item from '../domain/model/item.entity';

describe('CreateItemService', () => {
  let service: CreateItemService;
  let repository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateItemService,
        {
          provide: 'ItemRepository',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateItemService>(CreateItemService);
    repository = module.get('ItemRepository');
  });

  it('should create an item successfully', async () => {
    const createItemDto = {
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
    };

    const createdItem = new Item({
      name: createItemDto.name,
      description: createItemDto.description,
      images: createItemDto.images,
      price: createItemDto.price,
      quantity: createItemDto.quantity,
      category: createItemDto.category,
    });

    repository.create.mockResolvedValue(createdItem);

    const result = await service.create(createItemDto);

    expect(result).toEqual(createdItem);
    expect(repository.create).toHaveBeenCalledWith(createItemDto);
  });
});
