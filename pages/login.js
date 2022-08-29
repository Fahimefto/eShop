import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";

export default function login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = ({ email, password }) => {};
  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md p-10 shadow-2xl mt-5"
        onSubmit={handleSubmit(submit)}
      >
        <h1 className="font-bold text-xl text-center p-5">Login </h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: "please enter a email" })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "please enter a password",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="w-full border-green-500 p-2 mt-5  border-2 rounded-md"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="mt-5 ">
          <button className="bg-green-500 p-3 rounded-b-md ">Login</button>
        </div>
        <div className="mt-5 ">
          <div className="text-bold">
            <Link href="/register">
              <a className="text-green-800 font-bold">
                Don't have any Account? Register Account
              </a>
            </Link>
          </div>
        </div>
      </form>
    </Layout>
  );
}
