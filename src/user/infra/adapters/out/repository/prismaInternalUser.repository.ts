import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { CreateInternalUserDto } from 'src/user/domain/dto/createInternalUser.dto';
import { InternalUser } from 'src/user/domain/model/internalUser.entity';
import { InternalUserRepositoryInterface } from 'src/user/domain/repository/internalUser.repository';
import { mapRepositoryToInternalUserEntity } from './mappings/mapRepositoryInternalUserToDTO';
import { RoleType } from 'src/user/domain/model/role-type';
import { RoleType as PrismaRoleType } from '@prisma/client';

@Injectable()
export class PrismaInternalUserRepository
  implements InternalUserRepositoryInterface
{
  constructor(private readonly prisma: PrismaService) {}

  async create(createInternalUser: InternalUser): Promise<InternalUser> {
    try {
      const createdUserInternal = await this.prisma.internalUser.create({
        data: {
          registrationNumber: createInternalUser.registrationNumber,
          name: createInternalUser.name,
          cpf: createInternalUser.cpf,
          email: createInternalUser.email,
          password: createInternalUser.password,
          roleId: createInternalUser.roleId,
        },
      });

      return mapRepositoryToInternalUserEntity(createdUserInternal);
    } catch (error) {
      console.error('Error creating InternalUser:', error);
      throw new Error('Failed to create InternalUser');
    }
  }

  async findByCpf(_cpf: string): Promise<boolean> {
    try {
      const user = await this.prisma.internalUser.findUnique({
        where: {
          cpf: _cpf,
        },
      });

      if (!user) return false;

      return true;
    } catch {
      throw new Error('Error searching for user by CPF.');
    }
  }

  async findRoleId(roleType: RoleType): Promise<string> {
    try {
      const role = await this.prisma.role.findFirstOrThrow({
        where: {
          type: roleType as PrismaRoleType,
        },
      });

      return role.id;
    } catch {
      throw new Error('Error searching for user role id.');
    }
  }

  async findByCpfOrEmailOrRegistrationNumber(
    _cpf: string,
    _email: string,
    _registrationNumber: string,
  ): Promise<boolean> {
    try {
      const user = await this.prisma.internalUser.findFirst({
        where: {
          OR: [
            { cpf: _cpf },
            { email: _email },
            { registrationNumber: _registrationNumber },
          ],
        },
      });

      if (!user) return false;

      return true;
    } catch {
      throw new Error('Error searching for user by CPF.');
    }
  }
}
