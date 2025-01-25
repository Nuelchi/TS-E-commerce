"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../Controllers/productController");
// Declare an instance of productController
const myProductController = new productController_1.productController();
const router = (0, express_1.Router)();
// Define routes and bind controller methods to them
router.post("/create", myProductController.createProduct);
router.get("/all", myProductController.getAllProducts);
router.get("/:id", myProductController.getProductById);
router.put("/:id", myProductController.updateProduct);
router.delete("/:id", myProductController.deleteProduct);
exports.default = router;
