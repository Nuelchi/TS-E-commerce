import { Router } from "express";
import { productController } from "../Controllers/productController";
import { Protection } from "../Authorization/authentication";

// Declare an instance of productController and protection
const protect = new Protection

const myProductController = new productController();

const router = Router();

// Define routes and bind controller methods to them
router.post("/create",protect.protectPath,protect.restriction('admin'),myProductController.createProduct);
router.get("/", protect.protectPath,myProductController.getAllProducts);
router.get("/:id", myProductController.getProductById);
router.put("/:id",protect.protectPath,protect.restriction('admin'), myProductController.updateProduct);
router.delete("/:id", protect.protectPath,protect.restriction('admin'), myProductController.deleteProduct);

export default router;