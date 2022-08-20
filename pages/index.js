import data from "../data/data";
import Head from "next/head";

import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";

export default function Home() {
  return (
    <Layout title="Home">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItems product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}
