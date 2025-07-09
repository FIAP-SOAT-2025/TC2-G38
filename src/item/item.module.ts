import { Delete, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import CreateItemService from './application/services/createItem.service';
import { PrismaService } from '../shared/infra/prisma.service';
import { PrismaItemRepository } from './infraestructure/adapters/out/repository/prismaItem.repository';
import { ItemController } from './infraestructure/adapters/in/controller/item.controller';
import UpdateItemService from './application/services/updateItem.service';
import FindItemService from './application/services/findItem.service';
import DeleteItemService from './application/services/deleteItem.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ItemController],
  providers: [
    CreateItemService,
    UpdateItemService,
    FindItemService,
    DeleteItemService,
    {
      provide: 'ItemRepository',
      useClass: PrismaItemRepository,
    },
    {
      provide: 'UpdateItemServiceInterface',
      useExisting: UpdateItemService,
    },
    PrismaService,
  ],
  exports: [
    CreateItemService,
    UpdateItemService,
    FindItemService,
    DeleteItemService,
  ],
})
export class ItemModule {}
