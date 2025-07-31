import { BaseException } from 'src/shared/exceptions/exceptions.base';
import { InternalUserProps } from '../entities/internalUser.entity';
import { InternalUserGateway } from '../gateways/internalUser.gateway';
import { DbConnection } from '../interfaces/dbconnection';
import { InternalUserUseCase } from '../usecases/internalUser.usecase';
import { InternalUserPresenter } from '../presenters/internalUser.presenter';
export class InternalUserController {
  constructor() {}

  static async createInternalUser(
    newInternalUser: InternalUserProps,
    dbConnection: DbConnection,
  ) {
    const internalUserGateway = new InternalUserGateway(dbConnection);
    const internalUserUseCase = new InternalUserUseCase(internalUserGateway);
    try {
      const customerByCpf = await internalUserUseCase.create(newInternalUser);
      return InternalUserPresenter.formatInternalUIserToJson(customerByCpf);
    } catch (error) {
      console.error('Error fetching customer by CPF:', error);
      throw error;
    }
  }
}
