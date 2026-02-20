import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "PayPal Client ID is missing! Add VITE_PAYPAL_CLIENT_ID in .env"
    );
  }

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD",        // ✅ REQUIRED
        intent: "capture",      // ✅ safer
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(), // ✅ MUST be string
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details);
          });
        }}
        onError={(err) => {
          console.error("PayPal Error:", err); // ✅ see real error
          onError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
