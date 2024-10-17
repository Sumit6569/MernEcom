import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  productsReducer,
  newReviewReducer,
  
} from "./reducers/productReducer";
import { thunk } from "redux-thunk";
import {
  productDetailsReducer,
  newProductReducer,
} from "./reducers/productReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";

import { cartReducer } from "./reducers/cartReducer";

import {
  allUsersReducer,
  forgotPasswordReducer,
  userReducer,
  profileReducer,
} from "./reducers/userReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  product: productsReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,

  newProduct: newProductReducer,

  // Add other reducers here as needed, e.g., productsReducer, userReducer, cartReducer, etc.
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer,
  initialState,
  // Add additional middleware here as needed, e.g., logger
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // Automatically handled by configureStore
});

export default store;
