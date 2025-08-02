export class OrderItemProps {
  itemId: string;
  orderId?: string;
  quantity: number;
  price: number;
}

export class OrderItem {
  _itemId: string;
  _orderId?: string;
  _quantity: number;
  _price: number;

  constructor(props: OrderItemProps) {
    this._itemId = props.itemId;
    this._orderId = props.orderId;
    this._quantity = props.quantity;
    this._price = props.price;
  }

  setItemId(orderId: string): void {
    if (!orderId) {
      throw new Error('Order ID cannot be empty');
    }
    this._orderId = orderId;
  }

  get itemId(): string {
    return this._itemId;
  }

  get orderId(): string | undefined {
    return this._orderId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  setOrderId(orderId: string): void {
    if (!orderId) {
      throw new Error('Order ID cannot be empty');
    }
    this._orderId = orderId;
  }

  setQuantity(quantity: number): void {
    if (!quantity || quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    this._quantity = quantity;
  }

  setPrice(price: number): void {
    if (!price || price <= 0) {
      throw new Error('Price must be greater than zero');
    }
    this._price = price;
  }
}
