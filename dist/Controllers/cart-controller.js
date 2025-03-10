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
exports.cartController = void 0;
const cart_model_1 = __importDefault(require("../Models/cart-model"));
const productModel_1 = __importDefault(require("../Models/productModel"));
class cartController {
    constructor() {
        // Add product to cart
        this.addToCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const { productId, quantity } = req.body;
                if (!productId || !quantity) {
                    res.status(400).json({ message: "Product ID and quantity are required" });
                    return;
                }
                const product = yield productModel_1.default.findById(productId);
                if (!product) {
                    res.status(404).json({ message: "Product not found" });
                    return;
                }
                let cart = yield cart_model_1.default.findOne({ userId: user.id });
                if (!cart) {
                    cart = new cart_model_1.default({ userId: user.id, products: [], totalPrice: 0 });
                }
                const existingProduct = cart.products.find(item => item.productId.toString() === productId);
                if (existingProduct) {
                    existingProduct.quantity += quantity;
                }
                else {
                    cart.products.push({ productId, quantity });
                }
                cart.totalPrice = yield this.calculateTotalPrice(cart.products);
                yield cart.save();
                res.status(200).json({ message: "Product added to cart", cart });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        // Get user's cart
        this.getCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const cart = yield cart_model_1.default.findOne({ userId: user.id }).populate("products.productId");
                if (!cart) {
                    res.status(404).json({ message: "Cart is empty" });
                    return;
                }
                res.status(200).json(cart);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        // Remove product from cart
        this.removeFromCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const { productId } = req.params;
                let cart = yield cart_model_1.default.findOne({ userId: user.id });
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
                cart.totalPrice = yield this.calculateTotalPrice(cart.products);
                yield cart.save();
                res.status(200).json({ message: "Product removed from cart", cart });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        // Delete entire cart
        this.deleteCart = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                if (!user) {
                    res.status(401).json({ message: "Unauthorized. User not found." });
                    return;
                }
                const cart = yield cart_model_1.default.findOne({ userId: user.id });
                if (!cart) {
                    res.status(404).json({ message: "Cart not found" });
                    return;
                }
                yield cart_model_1.default.deleteOne({ userId: user.id });
                res.status(200).json({ message: "Cart deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        // Helper function to calculate total price
        this.calculateTotalPrice = (products) => __awaiter(this, void 0, void 0, function* () {
            const productPrices = yield Promise.all(products.map((item) => __awaiter(this, void 0, void 0, function* () {
                const product = yield productModel_1.default.findById(item.productId);
                return product ? product.price * item.quantity : 0;
            })));
            return productPrices.reduce((acc, curr) => acc + curr, 0);
        });
    }
}
exports.cartController = cartController;
