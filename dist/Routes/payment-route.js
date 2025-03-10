"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../Authorization/authentication");
const express_1 = require("express");
const paystack_controller_1 = require("../Controllers/paystack-controller");
//create a new instance
const Protect = new authentication_1.Protection();
const initialize = new paystack_controller_1.InitializePayment();
const router = (0, express_1.Router)();
// ✅ Initialize Payment
router.post("/initialize-payment", Protect.protectPath, initialize.initPay);
//verify payment
router.get("/verify-payment/:reference", initialize.verifyPay);
exports.default = router;
