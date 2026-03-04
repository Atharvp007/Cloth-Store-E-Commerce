import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 
import ProductReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    products: ProductReducer,
    cart:cartReducer,
    checkout:checkoutReducer,
  },
});

export default store;