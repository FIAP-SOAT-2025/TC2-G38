import { InternalUser } from '../../entities/internalUser.entity';
import { RoleType } from '../../infrastructure/api/dto/role-type';

export interface InternalUserGatewayInterface {
  create(internalUser: InternalUser): Promise<InternalUser>;
  findByCpf(cpf: string): Promise<boolean>;
  findByCpfOrEmailOrRegistrationNumber(
    cpf: string,
    email: string,
    registrationNumber: string,
  ): Promise<boolean>;
  findRoleId(roleType: RoleType): Promise<string>;
}
