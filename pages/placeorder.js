import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import Checkout from "../components/Checkout";
import { Store } from "../hooks/Store";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { getError } from "../error";
import axios from "axios";
import Cookies from "js-cookie";

export default function placeorder() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { CartItems, shippingAdress, paymentMethod } = cart;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    CartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: CartItems,
        shippingAdress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...cart,
          CartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster reverseOrder={false} />
      <Layout title="Place Order">
        <Checkout activeStep={3} />
        <h1 className="font-bold text-2xl m-4 text-center">Place Order</h1>
        {CartItems.length === 0 ? (
          <div className="text-center items-center mt-32 text-3xl p-3  font-extrabold ">
            Empty List !
            <div className="text-center mt-12  p-2 items-center font-bold bg-amber-400 hover:bg-amber-600 text-sm">
              <Link href="/">Go to Shopping</Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <div className="card  p-5">
                <h2 className="mb-2 text-lg font-bold">Shipping Address</h2>
                <div>
                  {shippingAdress.fullName}, {shippingAdress.adress},{" "}
                  {shippingAdress.city}, {shippingAdress.postalCode},{" "}
                  {shippingAdress.country}
                </div>
                <button className="bg-emerald-700 px-2 py-1 mt-2 text-white rounded-md">
                  <Link href="/shipping">Edit</Link>
                </button>
              </div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg font-bold">Payment Method</h2>
                <div>{paymentMethod}</div>
                <button className="bg-emerald-700 px-2 py-1 mt-2 text-white rounded-md">
                  <Link href="/payment">Edit</Link>
                </button>
              </div>
              <div className="card overflow-x-auto p-5">
                <h2 className="mb-2 text-lg font-bold">Order Items</h2>
                <table className="min-w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="px-5 text-left">Item</th>
                      <th className="    p-5 text-right">Quantity</th>
                      <th className="  p-5 text-right">Price</th>
                      <th className="p-5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CartItems.map((item) => (
                      <tr key={item._id} className="border-b">
                        <td>
                          <Link href={`/products/${item.slug}`}>
                            <a className="flex items-center">
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                              ></Image>
                              &nbsp;
                              {item.name}
                            </a>
                          </Link>
                        </td>
                        <td className=" p-5 text-right">{item.quantity}</td>
                        <td className="p-5 text-right">${item.price}</td>
                        <td className="p-5 text-right">
                          ${item.quantity * item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="bg-emerald-700 px-2 py-1 mt-2 text-white rounded-md">
                  <Link href="/cart">Edit</Link>
                </button>
              </div>
            </div>
            <div>
              <div className="card  p-5">
                <h2 className="mb-2 text-lg font-bold">Order Summary</h2>
                <ul>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Items</div>
                      <div>${itemsPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Tax</div>
                      <div>${taxPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between">
                      <div>Shipping</div>
                      <div>${shippingPrice}</div>
                    </div>
                  </li>
                  <li>
                    <div className="mb-2 flex justify-between font-bold">
                      <div>Total</div>
                      <div>${totalPrice}</div>
                    </div>
                  </li>
                  <li>
                    <button
                      disabled={loading}
                      onClick={placeOrderHandler}
                      className="bg-emerald-700 p-2 mt-2 text-white rounded-md font-bold w-full"
                    >
                      {loading ? "Loading..." : "Place Order"}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </>
  );
}
placeorder.auth = true;
