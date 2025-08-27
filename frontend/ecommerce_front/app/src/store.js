import { configureStore } from "@reduxjs/toolkit";
import products from "./features/products";
import user from "./features/user";
import cart from "./features/cart";
export const store = configureStore({
  reducer: {
    products,
    user,
    cart,
  },
});
