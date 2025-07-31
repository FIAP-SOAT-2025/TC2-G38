import { BaseException } from 'src/shared/exceptions/exceptions.base';

export interface InternalUserProps {
  id?: string;
  registrationNumber: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  roleId: string;
  roleName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class InternalUser {
  private _id?: string;
  private _registrationNumber: string;
  private _name: string;
  private _cpf: string;
  private _email: string;
  private _password: string;
  private _roleId: string;
  private _roleName?: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: InternalUserProps) {
    if (!props.registrationNumber) {
      throw new BaseException(
        'Registration number is required.',
        400,
        'INVALID_REGISTRATION_NUMBER',
      );
    }

    this._id = props.id;
    this._registrationNumber = props.registrationNumber;
    this.name = props.name;
    this.cpf = props.cpf;
    this.email = props.email;
    this.password = props.password;
    this._roleId = props.roleId;
    this._roleName = props.roleName;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string | undefined {
    return this._id;
  }

  get registrationNumber(): string {
    return this._registrationNumber;
  }

  get name(): string {
    return this._name;
  }

  get cpf(): string {
    return this._cpf;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get roleId(): string {
    return this._roleId;
  }

  get roleName(): string {
    return this._roleName || '';
  }

  set name(newName: string) {
    if (!newName || newName.length < 3) {
      throw new BaseException(
        'Name must be at least 3 characters.',
        400,
        'INVALID_NAME',
      );
    }
    this._name = newName;
  }

  set password(newPassword: string) {
    if (newPassword.length < 8) {
      throw new BaseException('Password too short.', 400, 'INVALID_PASSWORD');
    }
    const buffer = Buffer.from(newPassword, 'utf-8');
    const hashedPassword = buffer.toString('base64');
    this._password = hashedPassword;
  }

  set cpf(newCpf: string) {
    this._cpf = newCpf.replace(/\D/g, '');
  }

  set email(newEmail: string) {
    if (!newEmail.includes('@')) {
      throw new BaseException('Invalid email.', 400, 'INVALID_EMAIL');
    }
    this._email = newEmail;
  }

  toJSON() {
    return {
      id: this._id,
      registrationNumber: this._registrationNumber,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      roleId: this._roleId,
      roleName: this._roleName,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
