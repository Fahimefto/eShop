import Head from "next/head";

import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";
import db from "../db";
import Product from "../models/Product";

export default function Home({ products }) {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItems product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
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
