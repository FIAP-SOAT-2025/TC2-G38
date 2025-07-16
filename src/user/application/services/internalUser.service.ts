import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { CreateInternalUserDto } from 'src/user/domain/dto/createInternalUser.dto';
import { InternalUser } from 'src/user/domain/model/internalUser.entity';
import { InternalUserRepositoryInterface } from 'src/user/domain/repository/internalUser.repository';
import { InternalUserServiceInterface } from 'src/user/domain/services/internalUser.service.interface';
import { Buffer } from 'buffer';

@Injectable()
export class InternalUserService implements InternalUserServiceInterface {
  constructor(
    @Inject('InternalUserRepository')
    private readonly internalUserRepository: InternalUserRepositoryInterface<InternalUser>,
  ) {}

  async create(
    createInternalUserDto: CreateInternalUserDto,
  ): Promise<InternalUser> {
    try {
      const { password } = createInternalUserDto;
      createInternalUserDto.password = this.hashPassword(password);

      const userExists =
        await this.internalUserRepository.findByCpfOrEmailOrRegistrationNumber(
          createInternalUserDto.cpf,
          createInternalUserDto.email,
          createInternalUserDto.registrationNumber,
        );

      if (userExists) {
        throw new BadRequestException('Internal User Already Registered.');
      }

      const roleId = await this.internalUserRepository.findRoleId(
        createInternalUserDto.roleName,
      );

      const newInternalUser = await this.internalUserRepository.create(
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
