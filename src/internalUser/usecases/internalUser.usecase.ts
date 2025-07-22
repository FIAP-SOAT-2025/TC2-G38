import {
  InternalUser,
  InternalUserProps,
} from '../entities/internalUser.entity';
import { InternalUserServiceInterface } from '../interfaces/internalUser.usecase.interface';
import { InternalUserGatewayInterface } from '../interfaces/gateways.interface';
import { RoleType } from '../infrastructure/api/dto/role-type';

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
        throw new Error('Internal User Already Registered.');
      }
      const roleId = await this.internalUserGateway.getInternalUserRoleId(
        createInternalUser.roleName as RoleType,
      );
      const newInternalUser = await this.internalUserGateway.createInternalUser(
        new InternalUser({
          registrationNumber: createInternalUser.registrationNumber,
          name: createInternalUser.name,
          cpf: createInternalUser.cpf,
          email: createInternalUser.email,
          password: createInternalUser.password,
          roleId,
        }),
      );
      return newInternalUser;
    } catch (error) {
      console.log('Error when creating internal user:', error);
      throw error;
    }
  }
}
