"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("../Controllers/cart-controller");
const authentication_1 = require("../Authorization/authentication"); // Middleware to extract user from JWT
//create a new instance
const Protect = new authentication_1.Protection();
const cart = new cart_controller_1.cartController();
const router = (0, express_1.Router)();
// ✅ Add item to cart
router.post("/add", Protect.protectPath, cart.addToCart);
router.get("/getcart", Protect.protectPath, cart.getCart);
router.delete("/:id", Protect.protectPath, cart.removeFromCart);
router.delete("delete/", Protect.protectPath, cart.deleteCart);
exports.default = router;
