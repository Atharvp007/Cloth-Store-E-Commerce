import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import ProductReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import adminReducer from "./slices/adminSlice";
import adminproductReducer from "./slices/adminproductSlice";
import adminordersReducer from "./slices/adminorderSlice";
import ordersReducer from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
    orders:ordersReducer,
    admin:adminReducer,
    adminproducts:adminproductReducer,
    adminorders:adminordersReducer,
  },
});

export default store;