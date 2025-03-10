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
exports.userService = void 0;
const user_model_1 = require("../Models/user-model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class userService {
    // create user
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
            const user = yield user_model_1.userModel.create({ email: data.email, password: hashedPassword });
            const token = jsonwebtoken_1.default.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            return { user, token };
        });
    }
    //user login 
    // async loginUser(data: { email: string; password: string }) {
    //     const user = await userModel.findOne({ email: data.email }); // Assuming Mongoose, not Sequelize
    //     if (!user || !(await bcrypt.compare(data.password, user.password))) {
    //       throw new Error('Invalid credentials');
    //     }
    //     // Correctly referencing environment variables
    //     const secret = process.env.SECRET_STRING as string;
    //     const expiry = process.env.LOGIN_EXPIRY || '1h'; // Default to 1 hour if undefined
    //     if (!secret) {
    //       throw new Error('JWT secret is not defined in environment variables.');
    //     }
    //     return jwt.sign({ id: user.id }, 'secret', { expiresIn: '1hr' });
    //   }
    loginUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.userModel.findOne({ email: data.email });
            if (!user || !(yield bcryptjs_1.default.compare(data.password, user.password))) {
                throw new Error('Invalid credentials');
            }
            // ✅ Ensure SECRET_STRING is treated as a Secret type
            const secret = process.env.SECRET_STRING;
            const expiry = process.env.LOGIN_EXPIRY || '24h';
            if (!secret) {
                throw new Error('JWT secret is not defined in environment variables.');
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, secret, { expiresIn: expiry });
            return token;
        });
    }
    //get all user
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.userModel.find().select('-password');
                return users;
            }
            catch (error) {
                throw new Error(`Failed to fetch users: ${error.message}`);
            }
        });
    }
}
exports.userService = userService;
