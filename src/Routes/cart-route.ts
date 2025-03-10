
import { Router } from "express";
import  { cartController } from "../Controllers/cart-controller";
import { Protection } from "../Authorization/authentication";// Middleware to extract user from JWT

//create a new instance
const Protect = new Protection();

const cart = new cartController();



const router = Router();

// Add item to cart
router.post("/add", Protect.protectPath ,cart.addToCart);
router.get("/getcart", Protect.protectPath, cart.getCart);
router.delete("/:id", Protect.protectPath, cart.removeFromCart);
router.delete("delete/", Protect.protectPath, cart.deleteCart);

export default router;