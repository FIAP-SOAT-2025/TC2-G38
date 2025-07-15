export class CreatePamentUseCase {
  constructor() {}

  async createPayment(orderId: string, totalAmount: number){
    try {

    }catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }
}