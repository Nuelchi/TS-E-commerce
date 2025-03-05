"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
require("./Authorization/authService");
const express_session_1 = __importDefault(require("express-session"));
const productRoutes_1 = __importDefault(require("./Routes/productRoutes"));
const passport_1 = __importDefault(require("passport"));
// import mongoose from 'mongoose';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
// app.get("/", (req: Request, res: Response) =>{
//     res.send('Hello, this is express with typescript')
// });
app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Login with Google</a>');
});
//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: true,
}));
//initialize passport and session
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//ROUTES
app.use("/api/v1/product", productRoutes_1.default);
// Route to start Google login
app.get('/auth/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Callback route for Google to redirect to
app.get('/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/profile'); // Redirect to user profile after login
});
//profile route
app.get('/profile', (req, res) => {
    const user = req.user;
    res.send(`welcome ${user.name} you have successfully signed into E-commerce app, you may continue your shopping now!!`);
});
//logout route
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("/");
    });
});
//Mongo database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch((error) => console.log('connection failedt', error));
//PORT
app.listen(PORT, () => console.log(`server is successfully connected at http://localhost:${PORT}`));
