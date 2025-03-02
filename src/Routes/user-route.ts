import express from 'express';
import { UserController } from '../Controllers/userController';
// import { authenticate } from '../middlewares/auth.middleware'; // For protected routes (optional)

const router = express.Router();
const userController = new UserController();

//ROUTES
router.post('/signup',userController.signup);
router.post('/login', userController.login);
router.get('/users', userController.getAllUsers);
// router.patch('/update-password', authenticate, (req, res) => userController.updatePassword(req, res));
// router.get('/users', authenticate, (req, res) => userController.getAllUsers(req, res));

export default router;