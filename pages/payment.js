import React from "react";
import Layout from "../components/Layout";
import Checkout from "../components/Checkout";
import { useState, useContext, useEffect } from "react";
import { Store } from "../hooks/Store";
export default function payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAdress } = cart;
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!shippingAdress.adress) {
    }
  }, []);

  return (
    <Layout title="Payment">
      <Checkout activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mt-10 text-xl text-left mb-10 font-bold">
          Payment Method
        </h1>
        {["Bkash", "Cash On Delivery"].map((payment) => (
          <div key={payment} className="mb-5">
            <input
              name="PaymentMethod"
              className="p-2 focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-3 " htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
      </form>
      <div className="flex justify-between">
        <button className="p-2 rounded-md bg-amber-400">Back</button>
        <button className="p-2 rounded-md bg-green-600">Next</button>
      </div>
    </Layout>
  );
}
