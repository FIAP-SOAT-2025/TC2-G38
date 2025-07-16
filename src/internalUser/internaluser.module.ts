import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { InternalUserApiController } from './infrastructure/api/controllers/internalUser.api';
import { PrismaInternalUserRepository } from './infrastructure/persistence/prismaInternalUser.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [InternalUserApiController],
  providers: [
    {
      provide: 'DbConnection',
      useClass: PrismaInternalUserRepository, // Replace with your actual implementation class
    },
    PrismaService,
  ],
  exports: [],
})
export class InternalUserModule {}
