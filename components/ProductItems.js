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
        <p className="mb-2 font-serif">{product.brand}</p>
        <p>BDT: {product.price}</p>
        <button
          className="primary-button bg-indigo-500 py-2 px-3 mt-3 shadow outline-none hover:bg-indigo-700 rounded-md active:bg-indigo-800"
          type="button"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
