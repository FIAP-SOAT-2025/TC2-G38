import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/infra/prisma.service';
import { InternalUser, RoleType as PrismaRoleType } from '@prisma/client';
import { DbConnection } from 'src/internalUser/interfaces/dbconnection';

@Injectable()
export class PrismaInternalUserRepository implements DbConnection {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInternalUser: InternalUser): Promise<InternalUser> {
    return await this.prisma.internalUser.create({
      data: {
        registrationNumber: createInternalUser.registrationNumber,
        name: createInternalUser.name,
        cpf: createInternalUser.cpf,
        email: createInternalUser.email,
        password: createInternalUser.password,
        roleId: createInternalUser.roleId,
      },
    });
  }

  async findByCpf(_cpf: string): Promise<boolean> {
    const user = await this.prisma.internalUser.findUnique({
      where: {
        cpf: _cpf,
      },
    });

    if (!user) return false;

    return true;
  }

  async findRoleId(roleType: string): Promise<string> {
    const role = await this.prisma.role.findFirstOrThrow({
      where: {
        type: roleType as PrismaRoleType,
      },
    });

    return role.id;
  }

  async findByCpfOrEmailOrRegistrationNumber(
    _cpf: string,
    _email: string,
    _registrationNumber: string,
  ): Promise<boolean> {
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
  }
}
