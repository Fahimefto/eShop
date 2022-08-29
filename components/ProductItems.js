import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ProductItems({ product }) {
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
        <p className="mb-2 text-sm">{product.brand}</p>
        <p className="font-sans text-xs font-bold">{product.price} BDT</p>
        <button
          className="primary-button bg-green-500 py-1 font-serif px-3 mt-3 shadow-2xl outline-none hover:bg-green-700 rounded-md active:bg-green-800"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
