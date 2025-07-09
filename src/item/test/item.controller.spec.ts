import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateItemDto } from '../domain/dto/createItem.dto';
import ItemCategoryEnum from '../domain/model/itemCategory.enum';
import { AppModule } from '../../../src/app.module';
import { PrismaService } from 'src/shared/infra/prisma.service';

describe('ItemController (e2e)', () => {
  let app: INestApplication;
  const prismaServiceMock: jest.Mocked<PrismaService> = {
    onModuleInit: jest.fn(),
    onModuleDestroy: jest.fn(),
    item: {
      create: jest.fn(),
      update: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      findFirst: jest.fn(),
    },
  } as unknown as jest.Mocked<PrismaService>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/items (POST) - should create an Item successfully', async () => {
    const createItemDto: CreateItemDto = {
      name: 'Coke',
      description: 'Coke zero',
      images: ['https://placehold.co/600x400'],
      price: 10.5,
      quantity: 100,
      category: ItemCategoryEnum.BEVERAGE,
    };

    const mockCreatedItem = {
      id: '123',
      name: createItemDto.name,
      description: createItemDto.description,
      images: createItemDto.images,
      price: createItemDto.price,
      quantity: createItemDto.quantity,
      category: createItemDto.category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (prismaServiceMock.item.create as jest.Mock).mockResolvedValue(
      mockCreatedItem,
    );

    const response = await request(app.getHttpServer())
      .post('/item')
      .send(createItemDto)
      .expect(201);

    expect(Object.keys(response.body)).toEqual(
      expect.arrayContaining([
        'id',
        'name',
        'description',
        'price',
        'quantity',
        'category',
        'id',
        'createdAt',
        'updatedAt',
      ]),
    );

    expect(response.body).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        images: expect.arrayContaining([expect.any(String)]),
        price: expect.any(Number),
        quantity: expect.any(Number),
        category: expect.any(String),
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('category/:categoryEnum (GET) - should return the Category items successfully', async () => {
    const categoryEnum = ItemCategoryEnum.BEVERAGE;
    const mockItems = [
      {
        id: '123',
        name: 'Coke',
        description: 'Regular Coke',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: categoryEnum,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    (prismaServiceMock.item.findMany as jest.Mock).mockResolvedValue(mockItems);

    const response = await request(app.getHttpServer())
      .get(`/item/category/${categoryEnum}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.arrayContaining([expect.any(String)]),
          price: expect.any(Number),
          quantity: expect.any(Number),
          category: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        }),
      ]),
    );
  });

  it('/:id (GET) - should find an item by Id successfully', async () => {
    const categoryEnum = ItemCategoryEnum.BEVERAGE;
    const mockItems = [
      {
        id: '5ba023a4-b988-4749-8ec7-8794b171d665',
        name: 'Coke',
        description: 'Regular Coke',
        images: ['https://placehold.co/600x400'],
        price: 10.5,
        quantity: 100,
        category: categoryEnum,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    (prismaServiceMock.item.findFirst as jest.Mock).mockResolvedValue(
      mockItems[0],
    );

    const response = await request(app.getHttpServer())
      .get(`/item/5ba023a4-b988-4749-8ec7-8794b171d665`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.arrayContaining([expect.any(String)]),
        price: expect.any(Number),
        quantity: expect.any(Number),
        category: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });
});
