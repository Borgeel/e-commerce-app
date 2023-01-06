import React from "react";

import { Product, FooterBanner, HeroBanner } from "../components";

const Home = () => {
  return (
    <>
      HeroBanner
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Best steel for your money!</p>
      </div>
      <div className="products-container">
        {["Product 1", "Product 2", "Product 3"].map((product, index) => (
          <div key={index}> {product} </div>
        ))}
      </div>
      Footer
    </>
  );
};

export default Home;
