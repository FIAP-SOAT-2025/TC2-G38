export default interface OrderResponseInterface {
  id: string;
  status: string;
  totalAmount: number;
  customerId?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
