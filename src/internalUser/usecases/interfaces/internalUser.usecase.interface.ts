import { CreateInternalUserDto } from '../../../infrastructure/api/dto/createInternalUser.dto';
import { InternalUser } from '../../../entities/internalUser.entity';

export interface InternalUserServiceInterface {
  // change the dto to the transformed entity at the gateway
  create(createInternalUserDto: CreateInternalUserDto): Promise<InternalUser>;
}
