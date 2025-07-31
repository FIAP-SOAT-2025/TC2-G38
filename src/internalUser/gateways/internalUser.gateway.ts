import { RoleType } from '../entities/enums/roleType';
import { InternalUser } from '../entities/internalUser.entity';
import { DbConnection } from '../interfaces/dbconnection';
import { InternalUserGatewayInterface } from '../interfaces/gateways.interface';

export class InternalUserGateway implements InternalUserGatewayInterface {
  constructor(private readonly dbConnection: DbConnection) {}

  async createInternalUser(
    createInternalUser: InternalUser,
  ): Promise<InternalUser> {
    const internalUser = await this.dbConnection.create(createInternalUser);
    return new InternalUser(internalUser);
  }

  async getInternalUserByCpf(_cpf: string): Promise<boolean> {
    return await this.dbConnection.findByCpf(_cpf);
  }

  async getInternalUserRoleId(roleType: string): Promise<string> {
    return await this.dbConnection.findRoleId(roleType as RoleType);
  }

  async getInternalUserByCpfOrEmailOrRegistrationNumber(
    _cpf: string,
    _email: string,
    _registrationNumber: string,
  ): Promise<boolean> {
    return await this.dbConnection.findByCpfOrEmailOrRegistrationNumber(
      _cpf,
      _email,
      _registrationNumber,
    );
  }
}
