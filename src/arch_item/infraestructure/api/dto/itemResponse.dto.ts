

export interface ItemResponse { 
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: string[];
  category: string;
  updatedAt?: Date;
  createdAt?: Date;
  isDeleted?: boolean;
}