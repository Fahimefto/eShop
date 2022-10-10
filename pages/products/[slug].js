import Layout from "../../components/Layout";
import axios from "axios";
import { useContext } from "react";
import React from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../hooks/Store";
import db from "../../db";
import Product from "../../models/Product";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetails(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return (
      <Layout title="Not Found">
        <div className="p-5 text-center mt-5 bg-red-300">
          <h1 className="text-xl font-bold text-gray-900">No data found </h1>
        </div>
      </Layout>
    );
  }
  const addCartHandler = async () => {
    const existItems = state.cart.CartItems.find(
      (x) => x.slug === product.slug
    );
    const quantity = existItems ? existItems.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.instock < quantity) {
      toast.error("No more in stock");
    } else {
      dispatch({ type: "ADD_ITEM", payload: { ...product, quantity } });
      Router.push("/cart");
    }
  };

  return (
    <>
      <Toaster reverseOrder={false} />
      <Layout title={product.name}>
        <div className="py-2">
          <Link href="/">
            <a className="bg bg-amber-300 hover:bg-yellow-800 rounded-md p-2 ">
              Back to Products
            </a>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 md:gap-3 shadow-2xl mt-5">
          <div className="md:col-span-2 shadow-xl xl:col-span-1">
            <Image
              src={product.image}
              alt={product.name}
              height={640}
              width={640}
              layout="responsive"
            ></Image>
          </div>
          <div>
            <ul className="m-5  text-left">
              <li className="mb-1 font-bold">Name: {product.name}</li>
              <li>Category : {product.category}</li>
              <li>Brand :{product.brand}</li>
              <li>
                Reviews :{product.rating} of {product.numReviewers} reviews
              </li>

              <li>{product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>{product.price} BDT</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.instock > 0 ? (
                    <div className="text-green-600">In Stock</div>
                  ) : (
                    <div className="text-red-600">Out of Stock</div>
                  )}
                </div>
              </div>
              <button
                className="bg-green-600 hover:bg-green-700 rounded-md p-2 mt-2 w-full"
                onClick={addCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug: slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
