import { InternalUserProps } from '../entities/internalUser.entity';
import { InternalUserGateway } from '../gateways/internalUser.gateway';
import { DbConnection } from '../interfaces/dbconnection';
import { InternalUserUseCase } from '../usecases/internalUser.usecase';
export class InternalUserController {
  constructor() {}

  static createInternalUser(
    newInternalUser: InternalUserProps,
    dbConnection: DbConnection,
  ) {
    const internalUserGateway = new InternalUserGateway(dbConnection);
    const internalUserUseCase = new InternalUserUseCase(internalUserGateway);
    try {
      const customerByCpf = internalUserUseCase.create(newInternalUser);
      return customerByCpf;
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw new Error('Failed to fetch customer by CPF');
    }
  }
}
