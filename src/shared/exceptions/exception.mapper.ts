import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseException } from './exceptions.base';

export class ExceptionMapper {
  
  static mapToHttpException(error: BaseException): HttpException {

    if (error instanceof HttpException) {
      return error;
    }

    if (error instanceof BaseException) {
      return this.mapBaseExceptionToHttp(error);
    }

    return new InternalServerErrorException('Internal server error');
  }

  private static mapBaseExceptionToHttp(error: BaseException): HttpException {
    const { message, statusCode, errorCode } = error;
    const response = {
      message,
      errorCode,
      statusCode,
    };

    switch (statusCode) {
      case 400:
        return new BadRequestException(response);
      case 401:
        return new UnauthorizedException(response);
      case 403:
        return new ForbiddenException(response);
      case 404:
        return new NotFoundException(response);
      case 409:
        return new ConflictException(response);
      case 422:
        return new UnprocessableEntityException(response);
      case 500:
      default:
        return new InternalServerErrorException(response);
    }
  }
}
