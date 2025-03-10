import { Request, Response } from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import './services/authService'
import passport from 'passport';
import session from 'express-session';

//ROUTE IMPORTS
import productRoute from './Routes/productRoutes';
import paymentRoute from './Routes/payment-route';
import userRoute from './Routes/user-route';

const express = require ('express')
const mongoose = require ('mongoose')
const app = express();
const PORT = process.env.PORT || 3000;


type User = {
    name: string;
    email: string;
  };


// app.get("/", (req: Request, res: Response) =>{
//     res.send('Hello, this is express with typescript')
// });

app.get('/', (req:Request, res:Response) => {
    res.send('<a href="/auth/google">Login with Google</a>');
  });

  
//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(session ({
    secret: 'my-session-secret',
    resave: false,
    saveUninitialized: true,
}));
//initialize passport and session
app.use(passport.initialize());
app.use(passport.session());


//ROUTES
app.use("/api/v1/product", productRoute);
app.use("/api/payments",paymentRoute);
app.use("/api/user",userRoute);
// Route to start Google login
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/auth/google/callback',
    passport.authenticate('google', {
      failureRedirect: '/',
    }),
    (req:Request, res:Response) => {
      res.redirect('/profile'); // Redirect to user profile after login
    }
  );
//profile route
app.get('/profile', (req:Request, res:Response) => {
    const user = req.user as User;
    res.send(`welcome ${user.name} you have successfully signed into E-commerce app, you may continue your shopping now!!`)
});
//logout route
app.get("/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect("/");
    });
  });


//Mongo database
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('connected to the Database!!'))
    .catch ((error: Error) => console.log('connection failed', error));

//PORT
app.listen(PORT, ()=>
    console.log(`server is successfully connected at http://localhost:${PORT}`));

