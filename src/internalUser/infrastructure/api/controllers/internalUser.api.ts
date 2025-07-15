import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateInternalUserDto } from '../dto/createInternalUser.dto';
import { PrismaInternalUserRepository } from '../../persistence/prismaInternalUser.repository';

@ApiTags('InternalUser')
@Controller('/internal-user')
export class InternalUserController {
  constructor(private readonly internalUserRepository: PrismaInternalUserRepository) {}

  @Post('/create')
  async createUser(
    @Body() createInternalUserDto: CreateInternalUserDto,
  ): Promise<any> {
    const userCreate = await this.internalUserRepository.create(createInternalUserDto);
    return userCreate;
  }
}


