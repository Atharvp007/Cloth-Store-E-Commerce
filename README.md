# 🛍️ Cloth Store E-Commerce Website

A full-stack **Clothing Store E-Commerce Web Application** built using the **MERN Stack**.  
The platform allows customers to browse products, add them to a cart, and place orders while administrators manage products and orders.

This project demonstrates practical experience in:

- Full Stack Web Development
- REST API Design
- Authentication & Authorization
- Database Design
- Payment Gateway Integration

---

# 📌 Project Objective

The objective of this project is to build a **complete online clothing store** with **Admin and Customer roles**.

### Admin Features
Admins can manage the store by:

- Adding new products
- Updating product details
- Deleting products
- Managing product discounts
- Uploading product images
- Viewing customer orders
- Managing users

### Customer Features

Customers can:

- Browse clothing products
- View product details
- Add items to cart
- Checkout products
- Pay using PayPal
- View order history

---

# 🚀 Tech Stack

## Frontend
- React.js
- Redux
- React Router
- Tailwind CSS
- Axios

## Backend
- Node.js
- Express.js

## Database
- MongoDB with Mongoose

## Authentication
- JWT (JSON Web Token)

## Image Storage
- Cloudinary

## Payment Integration
- PayPal (React PayPal SDK)

---

# ✨ Features

### Product Management
- Add new products
- Update product details
- Delete products
- Category management
- Discount pricing
- Product stock management

### Shopping Features
- Product listing page
- Product detail page
- Add to cart
- Cart management
- Checkout flow

### Authentication
- User registration
- User login
- JWT authentication
- Protected routes

### Payment
- PayPal payment integration
- Secure order processing
- Order creation after successful payment

### Media Upload
- Product image upload using Cloudinary

### Admin Control
- Manage products
- Manage users
- View customer orders

---

# 🧱 Project Structure

```
Cloth-Store-E-Commerce
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── adminpanel
│   │   │   ├── cart
│   │   │   ├── common
│   │   │   ├── layout
│   │   │   ├── products
│   │   │   └── ui
│   │   ├── lib
│   │   ├── pages
│   │   ├── redux
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│
├── backend
│   ├── config
│   ├── data
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── seeder.js
│
└── README.md
```

---

# 📊 Database Models

## User
Stores authentication and role information.

Fields:
- name
- email
- password
- role (customer/admin)

Features:
- Password hashing using bcrypt
- Email validation
- Role-based access control

---

## Product

Stores all product information.

Important fields:

- name
- description
- price
- discountPrice
- countInStock
- sku
- category
- brand
- collections
- material
- gender
- sizes
- colors
- images
- rating
- numReviews
- tags
- dimensions
- weight

Special features:

- Discount validation
- Search indexing
- Virtual fields (discountPercent, finalPrice)

---

## Cart

Stores cart items for users and guests.

Fields:

- user
- guestId
- products
- totalPrice

---

## Checkout

Stores checkout session information before order confirmation.

Fields:

- user
- checkoutItems
- shippingAddress
- paymentMethod
- totalPrice
- paymentStatus
- paymentDetails

---

## Order

Stores finalized orders.

Fields:

- user
- orderItems
- shippingAddress
- paymentMethod
- totalPrice
- isPaid
- isDelivered
- order status

Order status:

- Processing
- Shipped
- Delivered
- Cancelled

---

# 🔗 API Endpoints

### User Routes
```
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

### Product Routes
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Upload Route
```
POST /api/upload
```

Used for uploading product images to Cloudinary.

---

# 💳 Payment Integration

The application integrates **PayPal** for secure payments.

Payment Flow:

```
Cart → Checkout → PayPal Payment → Order Creation
```

---

# 🌐 Environment Variables

Backend `.env`

```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Frontend `.env`

```
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

---

# ⚙️ Installation & Setup

### Clone Repository

```
git clone https://github.com/Atharvp007/Cloth-Store-E-Commerce.git
```

### Backend Setup

```
cd backend
npm install
npm run dev
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

# 🌍 Live UI Preview

You can view the UI of the project here:

### Frontend
```
https://your-frontend-url.com
```

### Backend API
```
https://your-backend-url.com/api
```

*(Replace these URLs after deployment)*

---

# 🎯 Assignment Requirements Covered

✔ Admin product management  
✔ Product browsing  
✔ Cart functionality  
✔ Checkout flow  
✔ REST API architecture  
✔ Authentication using JWT  
✔ MongoDB database integration  
✔ Responsive UI  

---

# ⭐ Additional Features

- PayPal payment integration
- Cloudinary image upload
- Redux state management
- Admin role management
- Guest cart support
- Database seeder script

---

# 👨‍💻 Author

Atharv Pawar  
MERN Stack Developer
