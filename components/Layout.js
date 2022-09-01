import Head from "next/head";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { Store } from "../hooks/Store";
import { useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Dropdown from "./Dropdown";
import { signOut } from "next-auth/react";

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [CartCount, setCartCount] = useState(0);
  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

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
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-green-500 ml-2">
                    {session.session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-1 w-56 origin-top-right shadow-xl  flex flex-col  bg-green-100 p-4 rounded-xl font-bold">
                    <Menu.Item>
                      <Dropdown className="dropdown-link " href="/profile">
                        Profile
                      </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                      <Dropdown className="dropdown-link " href="/history">
                        History
                      </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="dropdown-link hover:bg-red-300"
                        href="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
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
