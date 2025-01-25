import { Request, Response } from 'express'
import dotenv from 'dotenv';
dotenv.config();
import productRoute from './Routes/productRoutes'
// import mongoose from 'mongoose';

const express = require ('express')
const mongoose = require ('mongoose')
const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) =>{
    res.send('Hello, this is express with typescript')
});

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//ROUTES
app.use("/api/v1/product", productRoute);



//Mongo database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch ((error: Error) => console.log('connection failedt', error));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));