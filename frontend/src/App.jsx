import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/Layout/User.jsx";
import Home from "./pages/Home.jsx";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Collections from "./pages/Collections.jsx";
import ProductDetails from "./components/products/ProductDetails.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import OrderConfirm from "./pages/Orderconfirm.jsx";
import Orderdetails from "./pages/Orderdetails.jsx";
import MyOrders from "./pages/MyOrders.jsx";

import Admin from "./components/adminpanel/Admin.jsx";
import AdminHome from "./components/adminpanel/AdminHome.jsx";
import Usermanagement from "./components/adminpanel/Usermanagement.jsx";
import Productmanagement from "./components/adminpanel/Productmanagement.jsx";
import Editproduct from "./components/adminpanel/Editproduct.jsx";
import Ordermanagement from "./components/adminpanel/Ordermanagement.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />

      <Routes>
        {/* USER LAYOUT */}
        <Route path="/" element={<User />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path="collections/:collections" element={<Collections />} />
          <Route path="orderconfirm" element={<OrderConfirm />} />
          <Route path="order/:id" element={<Orderdetails />} />
        </Route>

        {/* ✅ ADMIN LAYOUT (FIXED) */}
        <Route path="admin" element={<Admin />}>
          <Route index element={<AdminHome />} />
           <Route path="users" element={<Usermanagement />} />
           <Route path="products" element={<Productmanagement />} />
           <Route path="products/:id/edit" element={<Editproduct />} />
            <Route path="orders" element={<Ordermanagement />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;