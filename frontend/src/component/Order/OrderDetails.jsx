import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material"; // Updated import
import { getOrderDetails, clearErrors } from "../../actions/orderAction.jsx";
import Loader from "../layout/Loader/Loader.jsx";
import { toast } from "react-toastify"; // Import toast

const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error); // Use toast for error messages
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);

  // Check if order is loaded
  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return <Typography>No order found.</Typography>;
  }

  return (
    <>
      <MetaData title="Order Details" />
      <div className="orderDetailsPage">
        <div className="orderDetailsContainer">
          <Typography component="h1">Order #{order._id}</Typography>
          <Typography>Shipping Info</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p>Name:</p>
              <span>{order.user ? order.user.name : "N/A"}</span>
            </div>
            <div>
              <p>Phone:</p>
              <span>{order.shippingInfo?.phoneNo || "N/A"}</span>
            </div>
            <div>
              <p>Address:</p>
              <span>
                {order.shippingInfo
                  ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
                  : "N/A"}
              </span>
            </div>
          </div>
          <Typography>Payment</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.paymentInfo?.status === "succeeded"
                    ? "greenColor"
                    : "redColor"
                }
              >
                {order.paymentInfo?.status === "succeeded"
                  ? "PAID"
                  : "NOT PAID"}
              </p>
            </div>
            <div>
              <p>Amount:</p>
              <span>₹{order.totalPrice || "N/A"}</span>
            </div>
          </div>

          <Typography>Order Status</Typography>
          <div className="orderDetailsContainerBox">
            <div>
              <p
                className={
                  order.orderStatus === "Delivered" ? "greenColor" : "redColor"
                }
              >
                {order.orderStatus || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="orderDetailsCartItems">
          <Typography>Order Items:</Typography>
          <div className="orderDetailsCartItemsContainer">
            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                  <span>
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
