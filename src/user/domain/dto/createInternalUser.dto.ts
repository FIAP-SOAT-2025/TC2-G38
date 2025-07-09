import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsCPF } from 'src/shared/utils/validators/cpf.validator';
import { IsStrongPassword } from 'src/shared/utils/validators/password.validator';
import { RoleType } from '../model/role-type';

export class CreateInternalUserDto {
  constructor(
    registrationNumber: string,
    name: string,
    cpf: string,
    email: string,
    password: string,
    roleName: RoleType,
  ) {
    this.registrationNumber = registrationNumber;
    this.name = name;
    this.cpf = cpf;
    this.email = email;
    this.password = password;
    this.roleName = roleName;
  }

  @ApiProperty({
    description: 'Registration from employee',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @ApiProperty({
    description: 'Name from employee',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cpf from employee',
    required: true,
  })
  @IsString()
  @IsCPF()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    description: 'Email from employee',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'password from employee',
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Role name from employee',
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(RoleType)
  roleName: RoleType;
}
