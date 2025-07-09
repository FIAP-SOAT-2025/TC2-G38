import { Customer } from "../model/customer.entity";

export interface GetCustomerByCpfServiceInterface {
  getCustomerByCpf(cpf: string): Promise<Customer>;
}
