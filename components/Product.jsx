import React from "react";
import Link from "next/link";

import { urlFor } from "../lib/client";

const Product = ({ product: { image, name, price, slug } }) => {
  return (
    <div className="flex flex-row cursor-pointer hover:scale-105 p-2 m-2 rounded-3xl bg-neutral-300 hover:bg-red-500 transition-all duration-500">
      <Link href={`/product/${slug.current}`}>
        <div className="flex flex-col justify-center h-42 w-42">
          <img
            src={urlFor(image && image[0])}
            widh={250}
            height={250}
            alt="product"
            className="object-cover"
          />
          <div className="ml-2">
            <p className="font-semibold text-xl"> {name} </p>
            <p className="font-mono"> ${price} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
