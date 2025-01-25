import { myProduct } from '../Interface/productInterface';

import mongoose, {model, Schema} from 'mongoose'

const productSchema = new Schema<myProduct> ({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    color: {type: String, required: true},
    location: {type: String, required: false},
    createdAt: {type: Date, default:Date.now},
    updatedAt: {type: Date, default:Date.now}
},
{timestamps: true});


export const product = model<myProduct>("product", productSchema);

