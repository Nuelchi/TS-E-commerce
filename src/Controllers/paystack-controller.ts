import { Request, Response } from "express";
import { paystackService } from "../services/payment-config";

export class InitializePayment {
    initPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, amount } = req.body;
            if (!email || !amount) {
                res.status(400).json({ message: "Email and amount are required" });
                return;
            }

            const paymentResponse = await paystackService.initializePayment(email, amount);
            res.status(200).json(paymentResponse);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    verifyPay = async (req: Request, res: Response): Promise<void> => {
        try {
            const { reference } = req.params;
            if (!reference) {
                res.status(400).json({ message: "Reference is required" });
                return;
            }

            const verificationResponse = await paystackService.verifyPayment(reference);
            res.status(200).json(verificationResponse);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}