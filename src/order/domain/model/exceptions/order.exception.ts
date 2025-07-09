export class OrderDomainError extends Error {
  constructor(message: string) {
    super(`${message}`);
    this.name = 'DomainError';
    Object.setPrototypeOf(this, OrderDomainError.prototype);
  }
}
