// models/cart-model.ts
import mongoose, { Document } from "mongoose";

interface CartProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  products: CartProduct[];
  totalPrice: number;
}

const CartSchema = new mongoose.Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalPrice: { type: Number, required: true, default: 0 },
});

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;

// interfaces/authenticated-request.ts
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role?: string };
}