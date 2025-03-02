import { User as UserInterface } from '../Interface/user-interface';
import bcrypt from 'bcryptjs'; 
import validator from 'validator';
import mongoose, { model, Schema, Document } from 'mongoose';

// Define the User Schema
const UserSchema = new Schema<UserInterface & Document>({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        minlength: 8,
        validate: {
            validator: function (this: UserInterface, confirmPassword: string) {
                return confirmPassword === this.password;
            },
            message: 'Password and confirm password do not match',
        },
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

// Pre-save hook to hash the password
UserSchema.pre('save', async function (next) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined;
    next();
});

// Export the model
export const userModel = model<UserInterface>('User', UserSchema);