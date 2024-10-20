import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure this is imported
import.meta.env;
import axios from "axios";

const PayPal = ({
  productPrice,
  productShippingAddress,
  cartItems, // Pass cart items
  userId, // Pass user ID
  calculatedTax, // Pass tax calculation
  calculatedShippingPrice, // Pass shipping price
  calculatedTotalPrice, // Pass total price calculation
}) => {
  // const initialOptions = {
  //   "client-id":
  //     "AUwsrfebfwiFPQPa3KuoC4RVMulzkWNACZwPtkgwP8t1UjPl4SAvZwyTJ7PftVWUVj_1NES38OJOasvr", // Replace with your PayPal client ID
  //   currency: "USD",
  //   intent: "capture",
  // };

  const initialOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID, // Use VITE_ prefix
    currency: "USD",
    intent: "capture",
  };

  console.log("cartItems:", cartItems);
  console.log("userId:", userId);
  console.log("calculatedTax:", calculatedTax);
  console.log("calculatedShippingPrice:", calculatedShippingPrice);
  console.log("calculatedTotalPrice:", calculatedTotalPrice);

  const navigate = useNavigate();

  // Save the order to the database
  const handleSuccess = (details) => {
    // const productShippingAddress = {
    //   address: "NewtAPUR",
    //   city: "Anytown",
    //   state: "NY",
    //   country: "USA",
    //   pinCode: "12345",
    //   phoneNo: "1234567890",
    // };

    // const cartItems = [
    //   {
    //     name: "Sample Product",
    //     quantity: 1,
    //     price: 29.99,
    //     image: "http://example.com/image.jpg",
    //     product: "603c9f0e66d22e001f5d9c1c", // Example product ID
    //   },
    // ];

    //const userId = "66ba58aa82abd81628650425"; // Example user ID
    const paymentDetails = {
      id: details.id, // Use the actual payment ID from the details
      status: "COMPLETED", // Sample payment status
    };

    // const itemPrice = 29.99;
    // const taxPrice = 2.0;
    // const shippingPrice = 5.0;
    // const totalPrice = 36.99;

    // const orderData = {
    //   shippingInfo: productShippingAddress,
    //   orderItems: cartItems,
    //   user: userId,
    //   paymentInfo: {
    //     id: paymentDetails.id,
    //     status: paymentDetails.status,
    //   },
    //   itemPrice: itemPrice,
    //   taxPrice: taxPrice,
    //   shippingPrice: shippingPrice,
    //   totalPrice: totalPrice,
    // };

    const orderData = {
      shippingInfo: productShippingAddress,
      orderItems: cartItems,
      user: userId,
      paymentInfo: {
        id: paymentDetails.id,
        status: paymentDetails.status,
      },
      itemPrice: productPrice,
      taxPrice: calculatedTax,
      shippingPrice: calculatedShippingPrice,
      totalPrice: calculatedTotalPrice,
    };

    let token = localStorage.getItem("token");
    console.log("Token: in paypal", token);

    const apiUrl = "https://mernecom-pgkp.onrender.com/api/v1/order/new";

    console.log("API URL:", apiUrl);

    axios
      .post(apiUrl, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log("Order saved successfully:", response.data);
        toast.success("Order Done successfully!");
        setTimeout(() => {
          console.log("Navigating to Success page...");
          navigate("/Success"); // Ensure this matches your route
        }, 2000); // Redirect after 2 seconds
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error saving order:", error.response); // Log response data
          console.error("Status code:", error.response.status); // Log status code
        } else {
          console.error("Error saving order:", error.message); // Log generic error message
          console.error("Error saving order:", error.response.data);
        }
        toast.error("Failed to save order.");
      });
  };

  const handleSucc = () => {
    // Navigate to success page after showing toast
    setTimeout(() => {
      navigate("/Success");
    }, 5000); // Redirect after 2 seconds to allow the toast to show
  };

  return (
    <>
      {/* Ensure ToastContainer is added */}
      <ToastContainer />

      {/* <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "100.00", // Replace with your actual total price
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              // Show success toast with payer name
              toast.success(
                `Payment Successful! Transaction completed by ${details.payer.name.given_name}`
              );

              // Navigate to success page
              handleSuccess();
            });
          }}
          onError={(err) => {
            // Show error toast
            toast.error("There was an issue with the payment.");
            console.error("PayPal Checkout onError", err);
          }}
        />
      </PayPalScriptProvider> */}

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => {
            console.log("Product Price: ", productPrice); // Log for debugging
            console.log("Shipping Address: ", productShippingAddress); // Log for debugging
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: productPrice, // Ensure the price is formatted as a string with two decimal points
                  },
                  shipping: {
                    address: {
                      address_line_1: productShippingAddress.address,
                      admin_area_2: productShippingAddress.city,
                      admin_area_1: productShippingAddress.state,
                      postal_code: productShippingAddress.pinCode,
                      country_code: productShippingAddress.country, // Ensure valid country code
                    },
                  },
                  // description: "Purchase of Product",
                },
              ],
            });
          }}
          // onApprove={(data, actions) => {
          //   return actions.order.capture().then((details) => {
          //     toast.success(
          //       `Payment Successful! Transaction completed by ${details.payer.name.given_name}`
          //     );
          //     handleSucc();
          //   });
          // }}

          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            toast.success(
              `Payment Successful! Transaction completed by ${details.payer.name.given_name}`
            );
            await handleSuccess(details); // Create order after successful payment
            handleSucc(); // Redirect to success page after successful payment
          }}
          onError={(err) => {
            toast.error("There was an issue with the payment.");
            console.error("PayPal Checkout onError", err);
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPal;
