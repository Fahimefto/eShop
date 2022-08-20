import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Layout({ title, children }) {
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
                <a className="text-md p-2">Cart</a>
              </Link>
              <Link href="/login">
                <a className="text-md p-2">Login</a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center item-center shadow-transparent">
          Developed by Fahim Iftekhar Efto
        </footer>
      </div>
    </>
  );
}
