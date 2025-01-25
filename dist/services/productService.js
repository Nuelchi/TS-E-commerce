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
exports.ProductService = void 0;
const productModel_1 = require("../Models/productModel");
class ProductService {
    // Create a new product
    createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = new productModel_1.product(data);
                return yield newProduct.save(); // Save the new product to the database
            }
            catch (error) { // Type error as `unknown`
                if (error instanceof Error) {
                    throw new Error(`Failed to create product: ${error.message}`);
                }
                throw new Error('Failed to create product: An unknown error occurred');
            }
        });
    }
    // Get all products
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.product.find(); // Fetch all products from the database
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch products: ${error.message}`);
                }
                throw new Error('Failed to fetch product: An unknown error occurred');
                ;
            }
        });
    }
    //get a product by Id
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return productModel_1.product.findById(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch product: ${error.message}`);
                }
                throw new Error('Failed to fetch product: An unknown error occurred');
                ;
            }
        });
    }
    //update a product by Id
    updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.product.findOneAndUpdate(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update product: ${error.message}`);
                }
                throw new Error('Failed to update product: An unknown error occurred');
                ;
            }
        });
    }
    //delete product
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productModel_1.product.findByIdAndDelete(id);
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete product: ${error.message}`);
                }
                throw new Error('Failed to delete product: An unknown error occurred');
                ;
            }
        });
    }
}
exports.ProductService = ProductService;
