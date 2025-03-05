import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;
const FRONTEND_URL = process.env.FRONTEND_URL as string;

interface PaystackResponse {
  status: boolean;
  message: string;
  data?: any;
}

export const paystackService = {
  // ✅ Initialize Payment
  async initializePayment(email: string, amount: number): Promise<PaystackResponse> {
    try {
      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100, // Convert Naira to Kobo
          currency: "NGN",
          callback_url: `${FRONTEND_URL}/payment-success`, // Redirect URL after payment
        },
        {
          headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error initializing payment:", error.response?.data || error.message);
      throw new Error("Payment initialization failed");
    }
  },

  // ✅ Verify Payment
  async verifyPayment(reference: string): Promise<PaystackResponse> {
    try {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error verifying payment:", error.response?.data || error.message);
      throw new Error("Payment verification failed");
    }
  },
};