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
    this._id = String(props.id);
    this.name = props.name;
    this.cpf = new Cpf(props.cpf).getCpf();
    this.email = props.email;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get id(): string | undefined {
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
    this._email = email;
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
      throw new Error('Invalid CPF');
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
