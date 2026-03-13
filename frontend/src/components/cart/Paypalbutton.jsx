import React, { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  if (!clientId) {
    throw new Error(
      "PayPal Client ID is missing! Add VITE_PAYPAL_CLIENT_ID in your .env"
    );
  }

  useEffect(() => {
    console.log("PayPal Client ID:", clientId);
    console.log("PayPal Button amount:", amount);
    console.log("Environment: sandbox");
  }, [clientId, amount]);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD",
        intent: "capture",
        components: "buttons",
        commit: true,
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          console.log("Creating order with amount:", amount);
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD", // explicitly set currency
                  value: amount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            console.log("Order approved:", data);
            const details = await actions.order.capture();
            console.log("Order captured successfully:", details);
            onSuccess(details);
          } catch (err) {
            console.error("Error capturing order:", err);
            onError(err);
          }
        }}
        onError={(err) => {
          console.error("PayPal Buttons onError:", err);
          onError(err);
        }}
        onCancel={(data) => {
          console.warn("Payment cancelled:", data);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;