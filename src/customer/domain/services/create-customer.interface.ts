import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../model/customer.entity';

export interface CustomerServiceInterface {
  create(item: CreateCustomerDTO): Promise<Customer>;
}
