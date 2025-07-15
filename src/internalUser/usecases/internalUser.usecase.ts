import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Buffer } from 'buffer';
import { InternalUserServiceInterface } from '../gateways/interfaces/usecases/internalUser.usecase.interface';
import { InternalUserGatewayInterface } from '../gateways/interfaces/internalUser.repository';
import { CreateInternalUserDto } from '../infrastructure/api/dto/createInternalUser.dto';
import { InternalUser } from '../entities/internalUser.entity';

@Injectable()
export class InternalUserUseCase implements InternalUserServiceInterface {
  constructor(
    @Inject('InternalUserRepository')
    private readonly internalUserGateway: InternalUserGatewayInterface,
  ) {}

  async create(
    createInternalUserDto: CreateInternalUserDto,
  ): Promise<InternalUser> {
    try {
      const { password } = createInternalUserDto;
      createInternalUserDto.password = this.hashPassword(password);

      const userExists =
        await this.internalUserGateway.findByCpfOrEmailOrRegistrationNumber(
          createInternalUserDto.cpf,
          createInternalUserDto.email,
          createInternalUserDto.registrationNumber,
        );

      if (userExists) {
        throw new BadRequestException('Internal User Already Registered.');
      }

      const roleId = await this.internalUserGateway.findRoleId(
        createInternalUserDto.roleName,
      );

      const newInternalUser = await this.internalUserGateway.create(
        new InternalUser({ ...createInternalUserDto, roleId }),
      );

      return newInternalUser;
    } catch (error) {
      console.log('Error when creating internal user:', error);
      throw error;
    }
  }

  private hashPassword(password: string): string {
    const buffer = Buffer.from(password, 'utf-8');
    const hashedPassword = buffer.toString('base64');
    return hashedPassword;
  }
}
