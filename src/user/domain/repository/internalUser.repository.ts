import { InternalUser } from '../model/internalUser.entity';
import { RoleType } from '../model/role-type';

export interface InternalUserRepositoryInterface {
  create(internalUser: InternalUser): Promise<InternalUser>;
  findByCpf(cpf: string): Promise<boolean>;
  findByCpfOrEmailOrRegistrationNumber(
    cpf: string,
    email: string,
    registrationNumber: string,
  ): Promise<boolean>;
  findRoleId(roleType: RoleType): Promise<string>;
}
