const express = require("express");
const Order = require("./models/order"); // Import the order schema
const router = express.Router();

// Create a new order
router.post("/order/new", async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    user,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    // Create a new order object
    const newOrder = new Order({
      shippingInfo,
      orderItems,
      user,
      paymentInfo,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();
    console.log("SaveOrderis" + savedOrder);
    // Respond with the saved order data
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Failed to save order." });
  }
});

module.exports = router;
