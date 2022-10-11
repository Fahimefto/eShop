import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ProductItems({ product, addCartHandler }) {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow object-cover h-64 w-full"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-content p-5">
        <Link href={`/products/${product.slug}`}>
          <a>
            <h2 className="text-lg font-bold">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2 text-sm tracking-widest">{product.brand}</p>
        <p className=" text-sm font-bold">{product.price} BDT</p>
        <button
          className=" bg-emerald-500 py-3 font-bold px-3 mt-3 shadow-2xl outline-none hover:bg-emerald-700 rounded-md active:bg-green-800"
          type="button"
          onClick={() => addCartHandler(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
