import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, price, slug } }) => {
  return (
    <div className="flex flex-row cursor-pointer hover:scale-105 duration-500 p-3">
      <Link href={`/product/${slug.current}`}>
        <div className="flex flex-col justify-center h-42 w-42 ">
          <img
            src={urlFor(image && image[0])}
            width={270}
            height={270}
            alt="product"
            className="object-cover rounded-2xl bg-neutral-200 hover:bg-neutral-300 transition-all duration-500"
          />
          <div className="ml-2">
            <p className="font-semibold text-xl text-blue-900"> {name} </p>
            <p className="font-extrabold text-xl"> ${price} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
