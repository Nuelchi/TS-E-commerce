"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../Controllers/productController");
const authentication_1 = require("../Authorization/authentication");
// Declare an instance of productController and protection
const protect = new authentication_1.Protection;
const myProductController = new productController_1.productController();
const router = (0, express_1.Router)();
// Define routes and bind controller methods to them
router.post("/create", protect.protectPath, protect.restriction('admin'), myProductController.createProduct);
router.get("/", protect.protectPath, myProductController.getAllProducts);
router.get("/:id", myProductController.getProductById);
router.put("/:id", protect.protectPath, protect.restriction('admin'), myProductController.updateProduct);
router.delete("/:id", protect.protectPath, protect.restriction('admin'), myProductController.deleteProduct);
exports.default = router;
