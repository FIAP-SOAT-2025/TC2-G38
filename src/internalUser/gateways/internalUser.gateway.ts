import { InternalUser } from '../entities/internalUser.entity';
import { RoleType } from '../infrastructure/api/dto/role-type';
import { DbConnection } from '../interfaces/dbconnection';
import { InternalUserGatewayInterface } from '../interfaces/gateways.interface';

export class InternalUserGateway implements InternalUserGatewayInterface {
  constructor(private readonly dbConnection: DbConnection) {}

  async createInternalUser(
    createInternalUser: InternalUser,
  ): Promise<InternalUser> {
    try {
      return await this.dbConnection.create(createInternalUser);
    } catch (error) {
      console.error('Error creating InternalUser:', error);
      throw new Error('Failed to create InternalUser');
    }
  }

  async getInternalUserByCpf(_cpf: string): Promise<boolean> {
    try {
      return await this.dbConnection.findByCpf(_cpf);
    } catch {
      throw new Error('Error searching for user by CPF.');
    }
  }

  async getInternalUserRoleId(roleType: string): Promise<string> {
    try {
      return await this.dbConnection.findRoleId(roleType as RoleType);
    } catch {
      throw new Error('Error searching for user role id.');
    }
  }

  async getInternalUserByCpfOrEmailOrRegistrationNumber(
    _cpf: string,
    _email: string,
    _registrationNumber: string,
  ): Promise<boolean> {
    try {
      return await this.dbConnection.findByCpfOrEmailOrRegistrationNumber(
        _cpf,
        _email,
        _registrationNumber,
      );
    } catch {
      throw new Error('Error searching for user by CPF.');
    }
  }
}
