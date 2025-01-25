import { ProductService } from '../services/productService'
import {Request, Response} from 'express'
import mongoose from 'mongoose';

const productService = new ProductService;

export class productController {


//create new product
    async createProduct(req: Request, res:Response): Promise<void>{
        try{
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json({ message: "Product created successfully", data: newProduct });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
        const products = await productService.getAllProducts(); 
        
        // If no products are found, return a message
        if (!products || products.length === 0) {
            res.status(404).json({ message: "No products found" });
            return;
        }
        
        // Send the products in the response if they exist
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


    // Get a product by ID
    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = new mongoose.Types.ObjectId(req.params.id);
            const product = await productService.getProductById(productId);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            res.status(200).json({ message: "Product fetched successfully", data: product });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Update a product by ID
    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = new mongoose.Types.ObjectId(req.params.id); 
            const updateProduct = req.body;
            const updatedProduct = await productService.updateProduct(productId, updateProduct); 

            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete a product by ID
    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const productId = new mongoose.Types.ObjectId(req.params.id); 
            const deletedProduct = await productService.deleteProduct(productId); 

            if (!deletedProduct) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            res.status(200).json({ message: "Product deleted successfully", data: deletedProduct });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

};

