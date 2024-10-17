const express = require("express");
const router = express.Router();
const paypal = require("@paypal/checkout-server-sdk");
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);

const client = new paypal.core.PayPalHttpClient(environment);

// Create an order
router.post("/create-order", async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00", // Set your dynamic price here
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(200).json({
      orderID: order.result.id,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Capture an order
router.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(200).json({
      capture: capture.result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
