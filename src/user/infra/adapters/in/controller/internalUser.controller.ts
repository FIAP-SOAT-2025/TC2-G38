import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InternalUserService } from 'src/user/application/services/internalUser.service';
import { CreateInternalUserDto } from 'src/user/domain/dto/createInternalUser.dto';
import { InternalUser } from 'src/user/domain/model/internalUser.entity';

@ApiTags('InternalUser')
@Controller('/internal-user')
export class InternalUserController {
  constructor(private readonly userService: InternalUserService) {}

  @Post('/create')
  async createUser(
    @Body() createInternalUserDto: CreateInternalUserDto,
  ): Promise<InternalUser> {
    const userCreate = await this.userService.create(createInternalUserDto);
    return userCreate;
  }
}
