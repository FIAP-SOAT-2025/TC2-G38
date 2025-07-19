import { RoleType } from '../infrastructure/api/dto/role-type';

export interface DbConnection {
  create(internalUser: any): Promise<any>;
  findByCpf(cpf: string): Promise<boolean>;
  findByCpfOrEmailOrRegistrationNumber(
    cpf: string,
    email: string,
    registrationNumber: string,
  ): Promise<boolean>;
  findRoleId(roleType: RoleType): Promise<string>;
}
