import { CreateInternalUserDto } from '../dto/createInternalUser.dto';
import { InternalUser } from '../model/internalUser.entity';

export interface InternalUserServiceInterface {
  create(createInternalUserDto: CreateInternalUserDto): Promise<InternalUser>;
}
