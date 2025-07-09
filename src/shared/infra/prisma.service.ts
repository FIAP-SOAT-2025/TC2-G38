import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import DataBaseConnectionPort from 'src/repository/db.port';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements DataBaseConnectionPort
{
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
