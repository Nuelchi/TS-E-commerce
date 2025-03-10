import { Request, Response } from "express";
import { paystackService } from "../services/payment-config";
import Cart from "../Models/cart-model";
import { userModel as User } from "../Models/user-model"; 


export class InitializePayment {
    // Initialize Payment
    initPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const user = (req as any).user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized. User not found." });
                return;
            }

            // Fetch user's email
            const userData = await User.findById(user.id).select("email");
            if (!userData) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            // Fetch user's cart
            const cart = await Cart.findOne({ userId: user.id });
            if (!cart || cart.products.length === 0) {
                res.status(400).json({ message: "Cart is empty" });
                return;
            }

            // Get email and total amount from cart
            const email = userData.email;
            const amount = cart.totalPrice * 100; // Convert to kobo (if using Paystack)

            // Initialize payment
            const paymentResponse = await paystackService.initializePayment(email, amount);
            res.status(200).json(paymentResponse);
        } catch (error: any) {
            console.error("Payment initialization error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };


    
    // Verify Payment
    verifyPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const { reference } = req.params;
            if (!reference) {
                res.status(400).json({ message: "Reference is required" });
                return;
            }

            // Verify payment with Paystack
            const verificationResponse = await paystackService.verifyPayment(reference);
            res.status(200).json(verificationResponse);
        } catch (error: any) {
            console.error("Payment verification error:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    };
}