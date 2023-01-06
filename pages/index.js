import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData[1]} />
      <div className="text-center mt-10 p-10">
        <h2 className="font-extrabold text-5xl m-5 text-blue-900">
          Bestseller Products
        </h2>
        <p className="text-2xl font-semibold">
          Steel worth every penny and more!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between p-10">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[1]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = "*[_type ==  'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type ==  'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
