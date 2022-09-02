import { Router, useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

export default function unauthorized() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 4000);
  }, []);

  return (
    <Layout title="Unauthorized">
      <div className="text-center mt-28 font-bold text-red-600 text-3xl">
        Access Denied
      </div>
      <div className="bg-green-400  text-center p-5 mt-10 rounded-lg">
        Please Login
      </div>
    </Layout>
  );
}
