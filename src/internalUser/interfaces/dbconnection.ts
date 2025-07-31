import { RoleType } from '../entities/enums/roleType';
import { InternalUserProps } from '../entities/internalUser.entity';

export interface DbConnection {
  create(internalUser: any): Promise<InternalUserProps>;
  findByCpf(cpf: string): Promise<boolean>;
  findByCpfOrEmailOrRegistrationNumber(
    cpf: string,
    email: string,
    registrationNumber: string,
  ): Promise<boolean>;
  findRoleId(roleType: RoleType): Promise<string>;
}
