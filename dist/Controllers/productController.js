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
exports.productController = void 0;
const productService_1 = require("../services/productService");
const mongoose_1 = __importDefault(require("mongoose"));
const productService = new productService_1.ProductService;
class productController {
    //create new product
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield productService.createProduct(req.body);
                res.status(201).json({ message: "Product created successfully", data: newProduct });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productService.getAllProducts();
                // If no products are found, return a message
                if (!products || products.length === 0) {
                    res.status(404).json({ message: "No products found" });
                    return;
                }
                // Send the products in the response if they exist
                res.status(200).json({ message: "Products fetched successfully", products });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Get a product by ID
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
                const product = yield productService.getProductById(productId);
                if (!product) {
                    res.status(404).json({ message: "Product not found" });
                    return;
                }
                res.status(200).json({ message: "Product fetched successfully", data: product });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Update a product by ID
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
                const updateProduct = req.body;
                const updatedProduct = yield productService.updateProduct(productId, updateProduct);
                if (!updatedProduct) {
                    res.status(404).json({ message: "Product not found" });
                    return;
                }
                res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    // Delete a product by ID
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = new mongoose_1.default.Types.ObjectId(req.params.id);
                const deletedProduct = yield productService.deleteProduct(productId);
                if (!deletedProduct) {
                    res.status(404).json({ message: "Product not found" });
                    return;
                }
                res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.productController = productController;
;
