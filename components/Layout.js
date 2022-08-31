import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Store } from "../hooks/Store";
import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [CartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(cart.CartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.CartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + " - eShop" : "eShop"}</title>
        <meta name="description" content="Ecommerce website next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 items-center px-4 shadow-md justify-between">
            <Link href="/">
              <a className="text-lg font-black">eShop</a>
            </Link>
            <div>
              <Link href="/cart">
                <a className="text-md p-2">
                  Cart
                  {CartCount > 0 && (
                    <span className="rounded-full ml-1 p-1 px-2 font-bold text-xs bg-red-500">
                      {CartCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === "loading" ? (
                "Loading"
              ) : session?.session.user ? (
                session.session.user.name
              ) : (
                <Link href="/login">
                  <a className="text-md p-2">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center item-center shadow-transparent mt-5">
          Developed by Fahim Iftekhar Efto
        </footer>
      </div>
    </>
  );
}
