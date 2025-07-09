import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { OrderDomainError } from 'src/order/domain/model/exceptions/order.exception';

@Catch(OrderDomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: OrderDomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(400).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
