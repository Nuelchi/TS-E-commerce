import express from 'express';
import { UserController } from '../Controllers/userController';
import { Protection } from "../Authorization/authentication";

const router = express.Router();

// Declaration of instance
const protect = new Protection
const userController = new UserController();

//ROUTES
router.post('/signup',userController.signup);
router.post('/login', userController.login);
router.get('/users',protect.protectPath,protect.restriction('admin'),userController.getAllUsers);


export default router;