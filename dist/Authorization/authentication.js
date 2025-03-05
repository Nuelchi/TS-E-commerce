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
exports.Protection = void 0;
const user_model_1 = require("../Models/user-model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Fix the import
class Protection {
    constructor() {
        // Middleware to protect routes
        this.protectPath = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationHeader = req.headers.authorization;
                if (!authorizationHeader || !authorizationHeader.toLowerCase().startsWith("bearer")) {
                    res.status(401).json({ message: "Authorization header missing or invalid" });
                    return; // ✅ Ensure function exits
                }
                const token = authorizationHeader.split(" ")[1]; // Extract the token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_STRING); // Verify token
                const user = yield user_model_1.userModel.findById(decoded.id);
                if (!user) {
                    res.status(400).json({ message: "User with token not found in DB. Please sign up or log in." });
                    return; // ✅ Ensure function exits
                }
                req.user = user; // Attach user object to request
                next(); // ✅ Call next() properly
            }
            catch (error) {
                console.error("Token verification failed:", error.message);
                res.status(401).json({ message: "Invalid or expired token" });
            }
        });
        // Middleware to restrict certain roles
        this.restriction = (...roles) => {
            return (req, res, next) => {
                if (!req.user) {
                    res.status(401).json({ message: "User not authenticated" });
                    return; // ✅ Ensure function exits
                }
                if (!roles.includes(req.user.role)) {
                    res.status(403).json({ message: "You do not have access to perform this action" });
                    return; // ✅ Ensure function exits
                }
                next(); // ✅ Allow request to continue
            };
        };
    }
}
exports.Protection = Protection;
