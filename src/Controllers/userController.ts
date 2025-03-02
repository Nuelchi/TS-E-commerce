// user.controller.ts
import { Request, Response } from 'express';
import { userService } from '../services/user-service';
const userServiceInstance = new userService();


export class UserController {
  private userService: userService;

  constructor() {
    this.userService = new userService();
  }

  async signup(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const token = await this.userService.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await userServiceInstance.getAllUsers(); 
        
        // If no products are found, return a message
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No products found" });
            return;
        }
        
        // Send the products in the response if they exist
        res.status(200).json({ message: "users fetched successfully", users });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}
};
