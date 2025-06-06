"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paystackService = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL;
exports.paystackService = {
    // ✅ Initialize Payment
    initializePayment(email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.post("https://api.paystack.co/transaction/initialize", {
                    email,
                    amount: amount * 100, // Convert Naira to Kobo
                    currency: "NGN",
                    callback_url: `${FRONTEND_URL}/payment-success`, // Redirect URL after payment
                }, {
                    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
                });
                return response.data;
            }
            catch (error) {
                console.error("Error initializing payment:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Payment initialization failed");
            }
        });
    },
    // ✅ Verify Payment
    verifyPayment(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const response = yield axios_1.default.get(`https://api.paystack.co/transaction/verify/${reference}`, {
                    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
                });
                return response.data;
            }
            catch (error) {
                console.error("Error verifying payment:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
                throw new Error("Payment verification failed");
            }
        });
    },
};
