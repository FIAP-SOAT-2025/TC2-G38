import { BaseException } from "src/shared/exceptions/exceptions.base";
export interface CustomerInterface {
  name: string;
  cpf: string;
  email: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Customer implements CustomerInterface {
  private _id: string;
  private _name: string;
  private _cpf: string;
  private _email: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: CustomerInterface) {
    if(!props.name.trim()) {
      throw new BaseException('Name cannot be empty', 400, 'NAME_EMPTY');
    }
    this._id = String(props.id);
    this.name = props.name;
    this.cpf = new Cpf(props.cpf).getCpf();
    this.email = new Email(props.email).getEmail();
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string {
    return this._id;
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
  get createdAt(): Date {
    return this._createdAt;
  }
  get updatedAt(): Date {
    return this._updatedAt;
  }
  set name(name: string) {
    this._name = name;
  }
  set cpf(cpf: string) {
    this._cpf = new Cpf(cpf).getCpf();
  }
  set email(email: string) {
    this._email = new Email(email).getEmail();
  }
  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }
  set createdAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  toJSON(): CustomerInterface {
    return {
      id: this._id,
      name: this._name,
      cpf: this._cpf,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}

export class Cpf {
  private readonly cpf: string;
  constructor(cpf: string) {
    this.cpf = this.onlyNumbers(cpf);
    if (!Cpf.isValid(this.cpf)) {
      throw new BaseException('Invalid CPF', 400, 'INVALID_CPF');
    }
  }

  private onlyNumbers(str: string) {
    return str.replace(/\D/g, '');
  }

  static isValid(cpf: string): boolean {
    if (cpf.length !== 11) return false;
    return true;
  }
  
  getCpf(): string {
    return this.cpf;
  }
}

export class Email {
  private readonly email: string;
  constructor(email: string) {
    this.email = email.toLowerCase();
    if (!Email.isValid(this.email)) {
      throw new BaseException('Invalid Email', 400, 'INVALID_EMAIL');
    }
  }

  static isValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  getEmail(): string {
    return this.email;
  }
}