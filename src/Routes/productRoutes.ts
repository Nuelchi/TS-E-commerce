import { Router } from "express";
import { productController } from "../Controllers/productController";

// Declare an instance of productController
const myProductController = new productController();

const router = Router();

// Define routes and bind controller methods to them
router.post("/create", myProductController.createProduct);
router.get("/", myProductController.getAllProducts);
router.get("/:id", myProductController.getProductById);
router.put("/:id", myProductController.updateProduct);
router.delete("/:id", myProductController.deleteProduct);

export default router;