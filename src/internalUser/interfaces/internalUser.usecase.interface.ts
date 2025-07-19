import {
  InternalUser,
  InternalUserProps,
} from '../entities/internalUser.entity';

export interface InternalUserServiceInterface {
  create(internalUser: InternalUserProps): Promise<InternalUser>;
}
