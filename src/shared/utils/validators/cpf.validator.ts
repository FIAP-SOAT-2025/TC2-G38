/* eslint-disable @typescript-eslint/no-unsafe-call */
import { registerDecorator, ValidationOptions } from 'class-validator';

import { isValidCPF } from '@brazilian-utils/brazilian-utils';

export function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isCPF',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return !!(typeof value === 'string' && isValidCPF(value));
        },
        defaultMessage(): string {
          return 'Invalid CPF';
        },
      },
    });
  };
}
