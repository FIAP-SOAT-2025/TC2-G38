import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsCPF } from 'src/shared/utils/validators/cpf.validator';

export class CreateCustomerDTO {
  constructor(name: string, cpf: string, email: string) {
    this.name = name;
    this.cpf = cpf;
    this.email = email;
  }

  @ApiProperty({
    description: 'Name from customer',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'CPF from customer',
    required: true,
  })
  @IsString()
  @IsCPF()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Email from customer',
    required: true,
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
