
import {Protection} from "../Authorization/authentication"
import { Router} from "express";
import { InitializePayment } from "../Controllers/payment-controller";

//create a new instance
const Protect = new Protection();

const initialize = new InitializePayment();
const router = Router();

// ✅ Initialize Payment
router.post("/initialize-payment", Protect.protectPath,initialize.initPay);

//verify payment
router.get("/verify-payment/:reference", initialize.verifyPay);
export default router;