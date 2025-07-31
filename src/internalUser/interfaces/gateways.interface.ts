import { RoleType } from '../entities/enums/roleType';
import { InternalUser } from '../entities/internalUser.entity';

export interface InternalUserGatewayInterface {
  createInternalUser(internalUser: InternalUser): Promise<InternalUser>;
  getInternalUserByCpf(cpf: string): Promise<boolean>;
  getInternalUserByCpfOrEmailOrRegistrationNumber(
    cpf: string,
    email: string,
    registrationNumber: string,
  ): Promise<boolean>;
  getInternalUserRoleId(roleType: RoleType): Promise<string>;
}
