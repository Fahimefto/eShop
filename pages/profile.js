import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getError } from "../error";
import axios from "axios";
import Layout from "../components/Layout";

export default function ProfileScreen() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("name", session.token.name);
    setValue("email", session.token.email);
  }, [session.token, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put("/api/auth/update", {
        name,
        email,
        password,
      });
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      toast.success("Profile updated successfully");
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
      <Layout title="Profile">
        <form
          className="mx-auto max-w-screen-md shadow-xl p-10 rounded-lg"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-2xl text-center font-bold mt-10">
            Update Profile
          </h1>

          <div className="mb-4">
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
              <div className="text-red-500">{errors.name.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              id="email"
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  message: "Please enter valid email",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              className="w-full p-2 border-2 border-emerald-300 rounded mt-3"
              type="password"
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "password is more than 5 chars",
                },
              })}
            />
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
          <div className="mb-4">
            <button className="bg-emerald-700 p-2 rounded-md text-white mt-3 font-semibold">
              Update Profile
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
}

ProfileScreen.auth = true;
