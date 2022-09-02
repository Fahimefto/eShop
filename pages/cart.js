import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../hooks/Store";
import dynamic from "next/dynamic";

function cartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { CartItems },
  } = state;
  const removeItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const updateHandler = (item, qnt) => {
    const quantity = Number(qnt);
    dispatch({ type: "ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <Layout title="Cart">
      <div className="py-2">
        <Link href="/">
          <a className="bg bg-amber-300 hover:bg-yellow-800 rounded-md p-2 ">
            Back to Products
          </a>
        </Link>
      </div>
      <h1 className="text-center font-bold text-xl mt-5 mb-12">
        Shopping Cart
      </h1>

      {CartItems.length === 0 ? (
        <div className="text-center items-center mt-32 text-3xl p-3  font-extrabold font-sans">
          Empty Cart !!!
          <div className="text-center mt-12  p-2 items-center font-bold bg-amber-400 hover:bg-amber-600 text-sm">
            <Link href="/">Go to Shopping</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3 shadow-md">
              <table className="min-h-full min-w-full">
                <thead className="border-b ">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-left">Quantity</th>
                    <th className="p-5 text-left">Price/item</th>
                    <th className="p-5 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {CartItems.map((item) => (
                    <tr key={item.slug}>
                      <td>
                        <Link href={`/products/${item.slug}`}>
                          <a className="flex items-center font-bold">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={30}
                              height={30}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-left">
                        <select
                          value={item.quantity}
                          onChange={(e) => updateHandler(item, e.target.value)}
                        >
                          {[...Array(item.instock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-left">{item.price} BDT</td>
                      <td className="p-5 text-left">
                        <button onClick={() => removeItem(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m-15 0l15 15"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-6 shadow-xl">
              <ul>
                <li>
                  <div className="pb-5 font-bold">
                    Subtotal ({CartItems.reduce((a, c) => a + c.quantity, 0)}) :{" "}
                    {CartItems.reduce((a, c) => a + c.quantity * c.price, 0)}{" "}
                    BDT
                  </div>
                </li>
                <li>
                  <button
                    className="p-2 bg-green-500 w-full rounded-md"
                    onClick={() => router.push("login?redirect=/shipping")}
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(cartScreen), { ssr: false });
