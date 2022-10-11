import Link from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useSession, signIn } from "next-auth/react";
import { Router, useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../error";

export default function login() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    console.log(session);
    if (session?.session.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async ({ email, password }) => {
    console.log(register);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(result.error));
    }
  };
  return (
    <Layout title="Login">
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

      <form
        className="mx-auto max-w-screen-md p-10 shadow-xl mt-5 rounded-lg"
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
            <Link href={`/register?redirect=${redirect || "/"}`}>
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
