import {
  InternalUser,
  InternalUserProps,
} from '../entities/internalUser.entity';

export class InternalUserPresenter {
  constructor() {}

  static formatInternalUIserToJson(
    customer: InternalUser,
  ): Partial<InternalUserProps> {
    return {
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
      email: customer.email,
      roleId: customer.roleId,
      registrationNumber: customer.registrationNumber,
      roleName: customer.roleName,
    };
  }
}
