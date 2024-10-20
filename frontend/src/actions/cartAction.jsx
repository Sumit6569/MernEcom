// import {
//   ADD_TO_CART,
//   REMOVE_CART_ITEM,
//   SAVE_SHIPPING_INFO,
// } from "../constants/cartConstants.jsx";
// import axios from "axios";

// // Add to Cart
// export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
//   const { data } = await axios.get(`/api/v1/product/${id}`);

//   dispatch({
//     type: ADD_TO_CART,
//     payload: {
//       product: data.product._id,
//       name: data.product.name,
//       price: data.product.price,
      
//       stock: data.product.Stock,
//       quantity,
//     },
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// // REMOVE FROM CART
// export const removeItemsFromCart = (id) => async (dispatch, getState) => {
//   dispatch({
//     type: REMOVE_CART_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// // SAVE SHIPPING INFO
// export const saveShippingInfo = (data) => async (dispatch) => {
//   dispatch({
//     type: SAVE_SHIPPING_INFO,
//     payload: data,
//   });

//   localStorage.setItem("shippingInfo", JSON.stringify(data));
// };






// src/actions/cartActions.js

import axios from "../axiosConfig"; // Use the custom axios instance
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants.jsx";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

















