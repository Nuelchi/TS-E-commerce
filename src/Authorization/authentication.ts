import { userModel as User } from "../Models/user-model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"; 
import dotenv from 'dotenv';
dotenv.config();

export class Protection {
    // Middleware to protect routes
    protectPath = async (req: Request & { user?: any }, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authorizationHeader = req.headers.authorization;
            if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer")) {
                res.status(401).json({ message: "Authorization header missing or invalid" });
                return; 
            }

            const token = authorizationHeader.split(" ")[1]; // Extract the token
            const decoded: any = jwt.verify(token, process.env.SECRET_STRING as string); // Verify token
            
            const user = await User.findById(decoded.id);
            if (!user) {
                res.status(400).json({ message: "User with token not found in DB. Please sign up or log in." });
                return; 
            }

            req.user = user; // Attach user object to request
            req.user.id = 
            next(); 
        } catch (error: any) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Invalid or expired token" });
        }
    };

    // Middleware to restrict certain roles
    restriction = (...roles: string[]) => {
        return (req: Request & { user?: any }, res: Response, next: NextFunction): void => {
            if (!req.user) {
                res.status(401).json({ message: "User not authenticated" });
                return; 
            }

            if (!roles.includes(req.user.role)) {
                res.status(403).json({ message: "You do not have access to perform this action" });
                return;
            }

            next(); 
        };
    };
} 