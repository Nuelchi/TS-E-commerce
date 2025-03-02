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
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const userServiceInstance = new user_service_1.userService();
class UserController {
    constructor() {
        this.userService = new user_service_1.userService();
    }
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userService.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield this.userService.loginUser(req.body);
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(401).json({ error: error.message });
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userServiceInstance.getAllUsers();
                // If no products are found, return a message
                if (!users || users.length === 0) {
                    res.status(404).json({ message: "No products found" });
                    return;
                }
                // Send the products in the response if they exist
                res.status(200).json({ message: "users fetched successfully", users });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.UserController = UserController;
;
