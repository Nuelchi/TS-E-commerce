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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializePayment = void 0;
const payment_config_1 = require("../services/payment-config");
class InitializePayment {
    constructor() {
        this.initPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, amount } = req.body;
                if (!email || !amount) {
                    res.status(400).json({ message: "Email and amount are required" });
                    return;
                }
                const paymentResponse = yield payment_config_1.paystackService.initializePayment(email, amount);
                res.status(200).json(paymentResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.verifyPay = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { reference } = req.params;
                if (!reference) {
                    res.status(400).json({ message: "Reference is required" });
                    return;
                }
                const verificationResponse = yield payment_config_1.paystackService.verifyPayment(reference);
                res.status(200).json(verificationResponse);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.InitializePayment = InitializePayment;
