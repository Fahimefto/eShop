import React from "react";
import Checkout from "../components/Checkout";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Store } from "../hooks/Store";
import cart from "./cart";
import { Router, useRouter } from "next/router";

export default function shipping() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAdress } = cart;
  useEffect(() => {
    setValue("fullName", shippingAdress.fullName);
    setValue("adress", shippingAdress.adress);
    setValue("city", shippingAdress.city);
    setValue("postalCode", shippingAdress.postalCode);
    setValue("contry", shippingAdress.contry);
  }, [setValue, shippingAdress]);

  const submit = ({ fullName, adress, city, postalCode, country }) => {
    dispatch({
      type: "ADD_SHIPPING_ADRESS",
      payload: { fullName, adress, city, postalCode, country },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAdress: {
          fullName,
          adress,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push("/payment");
  };
  return (
    <Layout title="Shipping Adress">
      <Checkout activeStep={1} />
      <form
        className="mx-auto max-w-screen-md p-10 shadow-xl  rounded-lg"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="font-bold text-xl text-center ">Shipping Address </h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="fullName"
            {...register("fullName", { required: "please enter Full Name" })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="fullName"
            autoFocus
          ></input>
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="adress">Adress</label>
          <input
            type="adress"
            {...register("adress", {
              required: "please enter your Adress",
              minLength: {
                value: 3,
                message: "Adress must be at least 3 characters",
              },
            })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="adress"
            autoFocus
          ></input>
          {errors.adress && (
            <div className="text-red-500">{errors.adress.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="city"
            {...register("city", {
              required: "please enter your city",
              minLength: {
                value: 3,
                message: "city must be at least 3 characters",
              },
            })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="city"
            autoFocus
          ></input>
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="postalCode"
            {...register("postalCode", {
              required: "please enter your postal Code",
            })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="postalCode"
            autoFocus
          ></input>
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="country">County</label>
          <input
            type="country"
            {...register("country", {
              required: "please enter your County ",
            })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="county"
            autoFocus
          ></input>
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>

        <div className="mt-5 ">
          <button className="bg-green-500 p-3 rounded-b-md ">Next</button>
        </div>
      </form>
    </Layout>
  );
}

shipping.auth = true;
