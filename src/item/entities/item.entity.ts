import { BaseException } from 'src/shared/exceptions/exceptions.base';
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
      throw new BaseException('Name cannot be empty', 400, 'ITEM_NAME_EMPTY');
    }
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    if (!value || value.trim().length === 0) {
       throw new BaseException('Description cannot be empty', 400, 'ITEM_DESCRIPTION_EMPTY');
    }
    this._description = value;
  }

  get images(): string[] {
    return this._images;
  }

  set images(value: string[]) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new BaseException('Images must be a non-empty', 400, 'ITEM_IMAGES_INVALID');
    }
    this._images = value;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value <= 0) {
      throw new BaseException('Price cannot be 0 or less', 400, 'ITEM_PRICE_INVALID');
    }
    this._price = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    if (value <= 0) {
      throw new BaseException('Quantity cannot be 0 or less', 400, 'ITEM_QUANTITY_INVALID');
    }
    this._quantity = value;
  }

  updateItemQuantity(value: number) {
    this._validateQuantity(value);

    const newQuantity = this._quantity - value;
    if (newQuantity < 0) {
      throw new BaseException('Quantity cannot be less than current quantity', 400, 'ITEM_QUANTITY_INVALID');
    }
    this._quantity = newQuantity;
  }

  private _validateQuantity(value: number): void {
   if (value < 0) {
      throw new BaseException('Quantity cannot be less than current quantity', 400, 'ITEM_QUANTITY_INVALID');
    }
  }

  get category(): ItemCategoryEnum {
    return this._category;
  }

  set category(value: ItemCategoryEnum) {
    if (!Object.values(ItemCategoryEnum).includes(value)) {
      throw new BaseException('Invalid category value', 400, 'ITEM_CATEGORY_INVALID');
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
      throw new BaseException('UpdatedAt cannot be before CreatedAt', 400, 'ITEM_UPDATED_AT_INVALID');
    }
    this._updatedAt = value;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }
}