import React from "react";

export default function Checkout({ activeStep = 0 }) {
  return (
    <div className="flex flex-wrap">
      {["User login", "Shipping Adress", "Payment Method", "Place Order"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-4 text-center font-bold ${
              index <= activeStep
                ? "border-green-400 text-green-600"
                : "border-amber-200 "
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
