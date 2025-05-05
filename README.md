# TS-E-commerce

A backend API for an e-commerce platform built with **TypeScript, Node.js, Express, and MongoDB**. This project provides authentication, product management, order processing, and cart functionality.

## 🚀 Features

### 🔑 Authentication & Authorization
- User registration & login with JWT authentication
- Role-based access control (Admin & User)

### 🛒 Product Management
- Create, read, update, and delete products (Admin only)
- View all products
- View a single product by ID

### 🛍️ Cart Management
- Add products to cart
- Remove/update cart items
- View cart items

### 📦 Order Management
- Place an order
- View order details
- Update order status 
- Delete an order

### 💳 Payment Integration: Paystack
- Secure payment processing with Paystack

### 🔐 Security & Middleware
- JWT authentication for protected routes
- Input validation & error handling

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Token (JWT)

## ⚙️ Installation

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Nuelchi/TS-E-commerce.git
cd TS-E-commerce
```

### 2️⃣ Install Dependencies and setup typescript with src and dist folders

## 📦 Dependencies

### **Main Dependencies**
- `@types/passport`
- `@types/passport-google-oauth20`
- `bcrypt`
- `bcryptjs`
- `dotenv`
- `express`
- `express-session`
- `jsonwebtoken`
- `mongodb`
- `mongoose`
- `passport`
- `passport-google-oauth20`
- `validator`
- `axios` *(for Paystack integration)*

### **Development Dependencies**
- `@types/bcryptjs`
- `@types/express`
- `@types/express-session`
- `@types/jsonwebtoken`
- `@types/node`
- `@types/validator`
- `nodemon`
- `ts-node`
- `typescript`

## ⚙️ Install 📦 Dependencies
```bash
npm install ...
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PAYSTACK_SECRET_KEY=your_paystack_secret
```

### 4️⃣ Run the Server
```bash
npm run dev
```
Server runs on `http://localhost:5000`

## 📌 API Endpoints

### Authentication
| Method | Endpoint | Description |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user & get token |

### Products
| Method | Endpoint | Description |

| GET    | `/api/products`     | Get all products |
| GET    | `/api/products/:id` | Get a single product |
| POST   | `/api/products`     | Create product (Admin) |
| PUT    | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Cart
| Method | Endpoint           | Description               |
|--------|--------------------|---------------------------|
| POST   | `/cart/add`        | Add item to cart          |
| GET    | `/cart/getcart`    | Get current cart          |
| DELETE | `/cart/:id`        | Remove an item from cart  |
| DELETE | `/cart/delete/`    | Delete entire cart        |

### Users
| POST   | `/user/signup` | create a new user |
| POST   | `/user/login` | login a user |
| GET    | `/users/`     | Get all users (admin)|

### Payment
| Method | Endpoint                          | Description           |
|--------|-----------------------------------|-----------------------|
| POST   | `/payment/initialize-payment`     | Initialize a payment  |
| GET    | `/payment/verify-payment/:reference` | Verify a payment   |


## 🚀 Future Improvements
- ✅ Implement unit tests with Jest
- ✅ Deploy the API to production


### 📩 Contact
For inquiries or collaborations:
- GitHub: [Nuelchi](https://github.com/Nuelchi)
- LinkedIn: [Emmanuel Nwafor](https://www.linkedin.com/in/mrnuel-a9935b1b1)
- Email: edubem80@gmail.com