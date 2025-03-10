"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/cart-model.ts
const mongoose_1 = __importDefault(require("mongoose"));
const CartSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
    totalPrice: { type: Number, required: true, default: 0 },
});
const Cart = mongoose_1.default.model("Cart", CartSchema);
exports.default = Cart;
