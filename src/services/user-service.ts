import { userModel } from "../Models/user-model";
import { User } from "../Interface/user-interface";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { promises } from "dns";


export class userService {
    // create user
    async createUser(data: { email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userModel.create({ email: data.email, password: hashedPassword });
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        return { user, token };
    }



    //user login 
    // async loginUser(data: { email: string; password: string }) {
    //     const user = await userModel.findOne({ email: data.email }); // Assuming Mongoose, not Sequelize
    //     if (!user || !(await bcrypt.compare(data.password, user.password))) {
    //       throw new Error('Invalid credentials');
    //     }

    //     // ✅ Correctly referencing environment variables
    //     const secret = process.env.SECRET_STRING as string;
    //     const expiry = process.env.LOGIN_EXPIRY || '1h'; // Default to 1 hour if undefined

    //     if (!secret) {
    //       throw new Error('JWT secret is not defined in environment variables.');
    //     }

    //     return jwt.sign({ id: user.id }, 'secret', { expiresIn: '1hr' });
    //   }

    async loginUser(data: { email: string; password: string }) {
        const user = await userModel.findOne({ email: data.email });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new Error('Invalid credentials');
        }

        // ✅ Ensure SECRET_STRING is treated as a Secret type
        const secret: Secret = process.env.SECRET_STRING!;
        const expiry: any = process.env.LOGIN_EXPIRY || '24h';

        if (!secret) {
            throw new Error('JWT secret is not defined in environment variables.');
        }

        const token = jwt.sign({ id: user.id }, secret, { expiresIn: expiry });

        return token;
    }

    //get all user
    async getAllUsers(): Promise<User[]> {
        try {
            const users = await userModel.find().select('-password');
            return users;
        } catch (error: any) {
            throw new Error(`Failed to fetch users: ${error.message}`);
        }
    }
}

