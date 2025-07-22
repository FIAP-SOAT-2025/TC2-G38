import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { firstValueFrom } from 'rxjs';
import { PaymentProviderInterface } from "src/payments/interfaces/payment-provider.interface";
import { PaymentTypeEnum } from "src/payments/domains/enums/payment-type.enum";
import { PaymentRepositoryInterface } from "src/payments/interfaces/payment-repository.interface";

@Injectable()
export class MercadoPagoClient implements PaymentProviderInterface{
  constructor(
    private readonly httpService: HttpService,
    @Inject('PaymentRepository')
    private readonly paymentRepository: PaymentRepositoryInterface,
  ){}

  async callPaymentApi(orderId: string, totalAmount: number): Promise<any> {
    const body = await this.buildPaymentBody(totalAmount, orderId );
    const headers = this.buildHeaders();
    try {
      const response = await firstValueFrom(this.httpService.post(process.env.API_BASE_URL!, body, { headers }));
      return response.data;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error; 
    }
  }

  private async buildPaymentBody(totalAmount: number, orderId: string): Promise<object> {
    const payer_email = (await this.paymentRepository.getOrGenerateCustomerEmail(orderId));
    return {
      transaction_amount: totalAmount,
      description: 'FIAP Fast Food Payment',
      payment_method_id: PaymentTypeEnum.PIX.toLowerCase(),
      payer: {
        email: payer_email,
      },
    };
  }

  private buildHeaders(): object {
    return {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
      'X-Idempotency-Key': uuidv4(),
    };
  }
}