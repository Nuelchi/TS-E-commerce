import { Request, Response } from "express";
import Cart from "../Models/cart-model";
import Product from "../Models/productModel";

export class cartController {
    
    // Add product to cart
    addToCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const { productId, quantity } = req.body;
            if (!productId || !quantity) {
                res.status(400).json({ message: "Product ID and quantity are required" });
                return;
            }

            const product = await Product.findById(productId);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            let cart = await Cart.findOne({ userId: user.id });
            if (!cart) {
                cart = new Cart({ userId: user.id, products: [], totalPrice: 0 });
            }

            const existingProduct = cart.products.find(item => item.productId.toString() === productId);
            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }

            cart.totalPrice = await this.calculateTotalPrice(cart.products);
            await cart.save();

            res.status(200).json({ message: "Product added to cart", cart });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // Get user's cart
    getCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const cart = await Cart.findOne({ userId: user.id }).populate("products.productId");
            if (!cart) {
                res.status(404).json({ message: "Cart is empty" });
                return;
            }

            res.status(200).json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // Remove product from cart
    removeFromCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const { productId } = req.params;
            let cart = await Cart.findOne({ userId: user.id });

            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }

            if (!cart.products || cart.products.length === 0) {
                res.status(400).json({ message: "Cart is empty" });
                return;
            }

            const initialLength = cart.products.length;
            cart.products.pull({ productId });

            if (cart.products.length === initialLength) {
                res.status(404).json({ message: "Product not found in cart" });
                return;
            }

            cart.totalPrice = await this.calculateTotalPrice(cart.products);
            await cart.save();

            res.status(200).json({ message: "Product removed from cart", cart });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // Delete entire cart
    deleteCart = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            const cart = await Cart.findOne({ userId: user.id });
            if (!cart) {
                res.status(404).json({ message: "Cart not found" });
                return;
            }

            await Cart.deleteOne({ userId: user.id });
            res.status(200).json({ message: "Cart deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    // Helper function to calculate total price
    private calculateTotalPrice = async (products: any[]): Promise<number> => {
        const productPrices = await Promise.all(
            products.map(async item => {
                const product = await Product.findById(item.productId);
                return product ? product.price * item.quantity : 0;
            })
        );
        return productPrices.reduce((acc, curr) => acc + curr, 0);
    };
}