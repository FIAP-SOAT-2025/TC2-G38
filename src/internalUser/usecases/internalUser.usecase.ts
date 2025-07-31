import {
  InternalUser,
  InternalUserProps,
} from '../entities/internalUser.entity';
import { InternalUserServiceInterface } from '../interfaces/internalUser.usecase.interface';
import { InternalUserGatewayInterface } from '../interfaces/gateways.interface';
import { RoleType } from '../entities/enums/roleType';
import { BaseException } from 'src/shared/exceptions/exceptions.base';

export class InternalUserUseCase implements InternalUserServiceInterface {
  constructor(private internalUserGateway: InternalUserGatewayInterface) {}

  async create(createInternalUser: InternalUserProps): Promise<InternalUser> {
    try {
      const userExists =
        await this.internalUserGateway.getInternalUserByCpfOrEmailOrRegistrationNumber(
          createInternalUser.cpf,
          createInternalUser.email,
          createInternalUser.registrationNumber,
        );
      if (userExists) {
        throw new BaseException(
          'Internal User Already Registered.',
          400,
          'USER_ALREADY_REGISTERED',
        );
      }
      const roleId = await this.internalUserGateway.getInternalUserRoleId(
        createInternalUser.roleName as RoleType,
      );
      return await this.internalUserGateway.createInternalUser(
        new InternalUser({
          registrationNumber: createInternalUser.registrationNumber,
          name: createInternalUser.name,
          cpf: createInternalUser.cpf,
          email: createInternalUser.email,
          password: createInternalUser.password,
          roleId,
        }),
      );
    } catch (error) {
      console.log('Error when creating internal user:', error);
      throw error;
    }
  }
}
