"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
const authentication_1 = require("../Authorization/authentication");
const router = express_1.default.Router();
// Declaration of instance
const protect = new authentication_1.Protection;
const userController = new userController_1.UserController();
//ROUTES
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', protect.protectPath, protect.restriction('admin'), userController.getAllUsers);
exports.default = router;
