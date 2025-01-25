"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const productRoutes_1 = __importDefault(require("./Routes/productRoutes"));
// import mongoose from 'mongoose';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send('Hello, this is express with typescript');
});
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//ROUTES
app.use("/api/v1/product", productRoutes_1.default);
//Mongo database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch((error) => console.log('connection failedt', error));
//PORT
app.listen(PORT, () => console.log(`server is successfully connected at http://localhost:${PORT}`));
