export interface DeleteCustomerServiceInterface {
  delete(id: string): Promise<void>;
}
