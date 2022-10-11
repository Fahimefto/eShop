import Link from "next/link";
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Layout from "../components/Layout";
import { getError } from "../error";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.session.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <>
      <Toaster reverseOrder={false} />
      <Layout title="Create Account">
        <form
          className="mx-auto max-w-screen-md shadow-2xl p-10 mt-10 font-bold"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-2xl mt-10 font-bold text-center">
            Create Account
          </h1>
          <div className="mb-4 ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              id="name"
              autoFocus
              {...register("name", {
                required: "Please enter name",
              })}
            />
            {errors.name && (
              <div className="text-rose-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              id="email"
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
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              id="password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please enter confirm password",
                validate: (value) => value === getValues("password"),
                minLength: {
                  value: 6,
                  message: "confirm password is more than 5 chars",
                },
              })}
            />
            {errors.confirmPassword && (
              <div className="text-red-500 ">
                {errors.confirmPassword.message}
              </div>
            )}
            {errors.confirmPassword &&
              errors.confirmPassword.type === "validate" && (
                <div className="text-red-500 ">Password do not match</div>
              )}
          </div>

          <div className="mb-4 ">
            <button className="p-2 rounded-lg mt-4 bg-emerald-700 text-white font-semibold ">
              Register
            </button>
          </div>
          <div className="mb-4 text-emerald-900">
            Already have an account? &nbsp;
            <Link href={`/login?redirect=${redirect || "/"}`}>Login now</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
