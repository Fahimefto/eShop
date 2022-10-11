import Head from "next/head";
import { Router, useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";
import db from "../db";
import { Store } from "../hooks/Store";
import Product from "../models/Product";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const addCartHandler = async (product) => {
    const existItems = state.cart.CartItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existItems ? existItems.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    console.log(data);
    if (data.instock < quantity) {
      toast.error("No more in stock");
    } else {
      dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
      toast.success("Item added to cart");
    }
  };
  return (
    <>
      <Toaster reverseOrder={false} />
      <Layout title="Home">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductItems
              product={product}
              key={product.slug}
              addCartHandler={addCartHandler}
            />
          ))}
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  console.log(products);
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
