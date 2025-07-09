import { InternalUser } from 'src/user/domain/model/internalUser.entity';
import { InternalUser as PrismaInternalUser } from '@prisma/client';

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
