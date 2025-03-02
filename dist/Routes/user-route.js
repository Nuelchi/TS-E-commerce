"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../Controllers/userController");
// import { authenticate } from '../middlewares/auth.middleware'; // For protected routes (optional)
const router = express_1.default.Router();
const userController = new userController_1.UserController();
//ROUTES
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
// router.patch('/update-password', authenticate, (req, res) => userController.updatePassword(req, res));
// router.get('/users', authenticate, (req, res) => userController.getAllUsers(req, res));
exports.default = router;
