import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../shared/infra/prisma.service';
import { PrismaItemRepository } from './infraestructure/persistence/prismaItem.repository';
import { ItemControllerApi } from './infraestructure/api/controller/item.api';



@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ItemControllerApi],
  providers:  [ PrismaItemRepository,
                PrismaService,
  ],
  exports: [],
})
export class ItemModule {}
