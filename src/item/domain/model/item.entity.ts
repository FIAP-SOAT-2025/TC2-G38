import { BadRequestException } from '@nestjs/common';
import ItemCategoryEnum from './itemCategory.enum';

export interface ItemProps {
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  category: ItemCategoryEnum;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export default class Item {
  private _id?: string;
  private _name: string;
  private _description: string;
  private _images: string[];
  private _price: number;
  private _quantity: number;
  private _category: ItemCategoryEnum;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _isDeleted: boolean;

  constructor(props: ItemProps) {
    this._id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.images = props.images;
    this.price = props.price;
    this.quantity = props.quantity;
    this.category = props.category;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._isDeleted = props.isDeleted ?? false;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new BadRequestException('Name cannot be empty.');
    }
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    if (!value || value.trim().length === 0) {
      throw new BadRequestException('Description cannot be empty.');
    }
    this._description = value;
  }

  get images(): string[] {
    return this._images;
  }

  set images(value: string[]) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new BadRequestException('Images must be a non-empty array.');
    }
    this._images = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value <= 0) {
      throw new BadRequestException('Price cannot be 0 or less.');
    }
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    if (value < 0) {
      throw new BadRequestException('Quantity cannot be negative.');
    }
    this._quantity = value;
  }

  updateItemQuantity(value: number) {
    this._validateQuantity(value);

    const newQuantity = this._quantity - value;
    if (newQuantity < 0) {
      throw new BadRequestException(
        'Quantity cannot be less than current quantity.',
      );
    }

    console.log(
      `Updating item quantity from ${this._quantity} to ${newQuantity}`,
    );
    this._quantity = newQuantity;
  }

  private _validateQuantity(value: number): void {
    if (value < 0) {
      throw new BadRequestException(
        'Quantity cannot be less than current quantity.',
      );
    }
  }

  get category(): ItemCategoryEnum {
    return this._category;
  }

  set category(value: ItemCategoryEnum) {
    if (!Object.values(ItemCategoryEnum).includes(value)) {
      throw new BadRequestException('Invalid category.');
    }
    this._category = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    if (value < this._createdAt || !new Date(value)) {
      throw new BadRequestException('UpdatedAt cannot be before CreatedAt.');
    }
    this._updatedAt = value;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  toItemProps(): ItemProps {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      images: this._images,
      price: this._price,
      quantity: this._quantity,
      category: this._category,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      isDeleted: this._isDeleted,
    };
  }
  toJSON() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      images: this.images,
      price: this._price,
      quantity: this._quantity,
      category: this._category,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}