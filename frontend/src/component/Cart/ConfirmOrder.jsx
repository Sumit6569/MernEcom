import React, { Component } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./ConfirmOrder.css";
import { Typography } from "@mui/material"; // Use @mui/material for Material-UI v5
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PayPal from "./PayPal";
import GooglePayButton from "./GooglePayButton";
const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [checkout, setCheckOut] = useState(false);
  console.log("The order is ", shippingInfo);
  console.log("The order is ", user);
  const navigate = useNavigate(); // useNavigate replaces history.push in React Router v6

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.18;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment"); // Use navigate instead of history.push
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography variant="h6">Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div></div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography variant="h6">Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography variant="h6">Order Summary</Typography>
            <div>
              <div>
                <p>Subtotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            {/* <PayPal
              productPrice={totalPrice}
              productShippingAddress={shippingInfo}
            /> */}
            <PayPal
              productPrice={totalPrice}
              productShippingAddress={shippingInfo}
              cartItems={cartItems}
              calculatedTax={tax}
              calculatedShippingPrice={shippingCharges}
              calculatedTotalPrice={totalPrice}
            />

            <GooglePayButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
