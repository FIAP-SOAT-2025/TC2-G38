import { Customer } from "../model/customer.entity";
import { UpdateCustomerDTO } from "../dto/update-customer.dto";

export interface UpdateCustomerServiceInterface {
  updated(id: string, customer: UpdateCustomerDTO): Promise<Customer>;
}
