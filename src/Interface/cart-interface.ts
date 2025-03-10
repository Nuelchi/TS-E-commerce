import { Document, Types } from "mongoose";

export interface ICartProduct {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  products: ICartProduct[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}