import Layout from "../components/Layout";
import Checkout from "../components/Checkout";
import { useState, useContext, useEffect } from "react";
import { Store } from "../hooks/Store";
import jsCookie from "js-cookie";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAdress, paymentMethod } = cart;
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      toast.warning("hey");
      console.log("not selected");
    }
    dispatch({ type: "SAVE_PAYMENT", payload: selectedPaymentMethod });
    jsCookie.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    );
    router.push("/placeorder");
    console.log(selectedPaymentMethod);
  };

  useEffect(() => {
    if (!shippingAdress) {
      return router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAdress]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <div className="flex justify-between">
            <button
              className="p-2 rounded-md bg-amber-400"
              onClick={() => router.push("/shipping")}
            >
              Back
            </button>

            <button className="p-2 rounded-md bg-green-600">Next</button>
          </div>
        </form>
      </Layout>
    </>
  );
}
Payment.auth = true;
