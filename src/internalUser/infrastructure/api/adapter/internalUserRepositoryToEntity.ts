import { InternalUser as PrismaInternalUser } from '@prisma/client';
import { InternalUser } from 'src/internalUser/entities/internalUser.entity';

export function mapRepositoryToInternalUserEntity(
  prismaUser: PrismaInternalUser,
): InternalUser {
  const created = new InternalUser({
    id: prismaUser.id,
    registrationNumber: prismaUser.registrationNumber,
    name: prismaUser.name,
    cpf: prismaUser.cpf,
    email: prismaUser.email,
    password: prismaUser.password,
    roleId: prismaUser.roleId,
  });
  return created;
}
