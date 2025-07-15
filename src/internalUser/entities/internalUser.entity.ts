import onlyNumbers from 'src/shared/utils/string';

export interface InternalUserProps {
  id?: string;
  registrationNumber: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  roleId: string;
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
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: InternalUserProps) {
    if (!props.registrationNumber) {
      throw new Error('Registration number is required.');
    }

    this._id = props.id;
    this._registrationNumber = props.registrationNumber;
    this.name = props.name;
    this.cpf = props.cpf;
    this.email = props.email;
    this.password = props.password;
    this._roleId = props.roleId;
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

  set name(newName: string) {
    if (!newName || newName.length < 3) {
      throw new Error('Name must be at least 3 characters.');
    }
    this._name = newName;
  }

  set password(newPassword: string) {
    if (newPassword.length < 8) {
      throw new Error('Password too short.');
    }
    this._password = newPassword;
  }

  set cpf(newCpf: string) {
    this._cpf = onlyNumbers(newCpf);
  }

  set email(newEmail: string) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email.');
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
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
