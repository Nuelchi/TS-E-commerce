import { Request, Response } from "express";
import Cart from "../Models/cart-model";
import Product from "../Models/productModel";
import dotenv from 'dotenv'
dotenv.config();

interface AuthenticatedRequest extends Request {
    user: { id: string; name?: string };
}

export class cartController {
  // Add product to cart
  async addToCart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: "Product ID and quantity are required" });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      let cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        cart = new Cart({ userId: req.user.id, products: [], totalPrice: 0 });
      }

      const existingProduct = cart.products.find((item) => item.productId.equals(productId));
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }

      cart.totalPrice = await this.calculateTotalPrice(cart.products);
      await cart.save();

      return res.status(200).json({ message: "Product added to cart", cart });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Get user's cart
  async getCart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");
      if (!cart) {
        return res.status(404).json({ message: "Cart is empty" });
      }

      return res.status(200).json(cart);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Remove product from cart
  async removeFromCart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { productId } = req.params;
      let cart = await Cart.findOne({ userId: req.user.id });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      cart.products.pull({ productId })
      cart.totalPrice = await this.calculateTotalPrice(cart.products);

      await cart.save();
      return res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Delete entire cart
  async deleteCart(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await Cart.deleteOne({ userId: req.user.id });
      return res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Calculate total price helper function
  private async calculateTotalPrice(products: any[]): Promise<number> {
    let total = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (product) {
        total += product.price * item.quantity;
      }
    }
    return total;
  }
}