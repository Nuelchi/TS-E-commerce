import mongoose, { Schema, Document, Types } from "mongoose";
import { ICart } from "../Interface/cart-interface";

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      new mongoose.Schema(
        {
          productId: { type: Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true, default: 1 },
        },
        { _id: false } // Prevents creating extra ObjectId for each product
      ),
    ],
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", CartSchema);