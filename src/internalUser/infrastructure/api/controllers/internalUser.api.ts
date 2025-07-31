import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateInternalUserDto } from '../dto/createInternalUser.dto';
import { DbConnection } from '../../../interfaces/dbconnection';
import { InternalUserController } from '../../../controllers/internalUser.controller';
import { InternalUserProps } from 'src/internalUser/entities/internalUser.entity';

@ApiTags('InternalUser')
@Controller('/internal-user')
export class InternalUserApiController {
  constructor(
    @Inject('DbConnection')
    private readonly dbConnection: DbConnection,
  ) {}

  @Post('/create')
  async createUser(
    @Body() createInternalUserDto: CreateInternalUserDto,
  ): Promise<any> {
    const newInternalUser: InternalUserProps = {
      registrationNumber: createInternalUserDto.registrationNumber,
      name: createInternalUserDto.name,
      cpf: createInternalUserDto.cpf,
      email: createInternalUserDto.email,
      password: createInternalUserDto.password,
      roleName: createInternalUserDto.roleName,
      roleId: '',
    };

    const userCreate = await InternalUserController.createInternalUser(
      newInternalUser,
      this.dbConnection,
    );
    return userCreate;
  }
}
