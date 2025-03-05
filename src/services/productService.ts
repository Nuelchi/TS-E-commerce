import product  from "../Models/productModel";
import { myProduct } from "../Interface/productInterface";
import mongoose from "mongoose";



export class ProductService {
    // Create a new product
    async createProduct(data: myProduct): Promise<myProduct> {
        try {
            const newProduct = new product(data);
            return await newProduct.save(); // Save the new product to the database
        } catch (error: unknown) { // Type error as `unknown`
            if (error instanceof Error) {
                throw new Error(`Failed to create product: ${error.message}`);
            }
            throw new Error('Failed to create product: An unknown error occurred');
        }
    }


    // Get all products
    async getAllProducts(): Promise<myProduct[]> {
        try {
            // Await the find operation to fetch all products from the database
            return await product.find(); 
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch products: ${error.message}`);
            }
            throw new Error('Failed to fetch products: An unknown error occurred');
        }
    }

    //get a product by Id
    async getProductById(id:mongoose.Types.ObjectId): Promise<myProduct | null> {
        try {
            return product.findById(id);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch product: ${error.message}`);
            }
            throw new Error('Failed to fetch product: An unknown error occurred');;

        }
    }


// Update a product by Id
async updateProduct(id: mongoose.Types.ObjectId, data: myProduct): Promise<myProduct | null> {
    try {
        // Ensure you pass the update data as the second argument
        return await product.findOneAndUpdate(
            { _id: id },    
            { $set: data },  
            { new: true }    
        );
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Failed to update product: ${error.message}`);
        }
        throw new Error('Failed to update product: An unknown error occurred');
    }
}


    //delete product
    async deleteProduct(id: mongoose.Types.ObjectId): Promise<myProduct | null> {
        try {
            return await product.findByIdAndDelete(id);
            
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Failed to delete product: ${error.message}`);
            }
            throw new Error('Failed to delete product: An unknown error occurred');;
        }
    }
}