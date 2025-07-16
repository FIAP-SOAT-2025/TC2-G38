import { InternalUser } from '../entities/internalUser.entity';
import { RoleType } from '../infrastructure/api/dto/role-type';

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
