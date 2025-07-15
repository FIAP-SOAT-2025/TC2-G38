import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalUserController } from './infra/adapters/in/controller/internalUser.controller';
import { InternalUserService } from './application/services/internalUser.service';
import { PrismaInternalUserRepository } from './infrastructure/persistence/prismaInternalUser.repository';
import { PrismaService } from 'src/shared/infra/prisma.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [InternalUserController],
  providers: [
    InternalUserService,
    PrismaService,
    {
      provide: 'InternalUserRepository',
      useClass: PrismaInternalUserRepository,
    },
  ],
  exports: [],
})
export class InternalUserModule {}
