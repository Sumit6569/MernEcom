import React, { useEffect } from "react";

const GooglePayButton = () => {
  useEffect(() => {
    // Load Google Pay SDK script
    const googlePayScript = document.createElement("script");
    googlePayScript.src = `https://pay.google.com/gp/p/js/pay.js`;
    googlePayScript.async = true;
    googlePayScript.onload = onGooglePayLoaded; // Call the function when the script loads
    document.body.appendChild(googlePayScript);

    return () => {
      // Cleanup: Remove the script on component unmount
      document.body.removeChild(googlePayScript);
    };
  }, []);

  const onGooglePayLoaded = () => {
    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST", // Change to "PRODUCTION" when going live
    });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "MASTERCARD"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "paypal", // Replace with your gateway
              gatewayMerchantId: "XF69TEJV49NQS", // Your gateway merchant ID
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "BCR2DN4TSO62H23R", // Replace with your merchant ID
        merchantName: "SumitEcommerce",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: "10.00", // Replace with your dynamic price
        currencyCode: "INR", // Card payments work with INR currency
        countryCode: "IN",
      },
    };

    const isReadyToPayRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: paymentDataRequest.allowedPaymentMethods,
    };

    paymentsClient
      .isReadyToPay(isReadyToPayRequest)
      .then((response) => {
        const buttonContainer = document.getElementById(
          "googlePayButtonContainer"
        );

        // Clear existing buttons
        buttonContainer.innerHTML = "";

        if (response.result) {
          const button = paymentsClient.createButton({
            onClick: () =>
              onGooglePaymentButtonClicked(paymentsClient, paymentDataRequest),
          });
          buttonContainer.appendChild(button);
        } else {
          console.log("Google Pay is not available.");
        }
      })
      .catch((err) => {
        console.error("Error checking Google Pay eligibility:", err);
      });
  };

  const onGooglePaymentButtonClicked = (paymentsClient, paymentDataRequest) => {
    paymentsClient
      .loadPaymentData(paymentDataRequest)
      .then((paymentData) => {
        // Handle the payment response here
        console.log("Payment successful", paymentData);
        // Send the payment token to your server for processing
      })
      .catch((err) => {
        console.error("Payment failed:", err);
      });
  };

  return (
    <div>
      <div id="googlePayButtonContainer"></div>
    </div>
  );
};

export default GooglePayButton;
