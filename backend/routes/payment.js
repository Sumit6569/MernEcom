const express = require("express");
const paypal = require("paypal-rest-sdk");
const router = express.Router(); // Use a router instead of app
const cors = require("cors");

// Enable CORS for the frontend
app.use(cors());

// PayPal configuration
paypal.configure({
  mode: "sandbox", // sandbox or live
  client_id:
    "AUwsrfebfwiFPQPa3KuoC4RVMulzkWNACZwPtkgwP8t1UjPl4SAvZwyTJ7PftVWUVj_1NES38OJOasvr",
  client_secret:
    "EJAGCrfJYDybWPDka1AxxCve49AHejCrrewKqifyoHjYUAz6moDvi3N1UAN9SecgQL4WSEmq-sXGNA7i",
});

// Define PayPal routes
router.get("/payment", async (req, res) => {
  console.log("Payment initiation request received");

  try {
    let create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:4000/success",
        cancel_url: "http://localhost:4000/failed",
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: "item",
                sku: "item",
                price: "1.00",
                currency: "USD",
                quantity: 1,
              },
            ],
          },
          amount: {
            currency: "USD",
            total: "1.00",
          },
          description: "This is the payment description.",
        },
      ],
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.error("Error creating payment:", error);
        return res.status(500).json({ error: "Payment creation failed" });
      } else {
        console.log("Create Payment Response:", payment);
        res.json(payment);
      }
    });
  } catch (error) {
    console.error("Error in /payment route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/success", async (req, res) => {
  console.log("Payment success callback received");
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  try {
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "1.00",
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.error("Error executing payment:", error);
          return res.redirect("http://localhost:5173/failed");
        } else {
          console.log("Execute Payment Response:", payment);
          return res.redirect("http://localhost:5173/success");
        }
      }
    );
  } catch (error) {
    console.error("Error in /success route:", error);
    res.redirect("http://localhost:5173/failed");
  }
});

router.get("/failed", (req, res) => {
  console.log("Payment failed callback received");
  return res.redirect("http://localhost:5173/failed");
});

module.exports = router; // Export the router
