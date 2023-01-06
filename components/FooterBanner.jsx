import Link from "next/link";
import React from "react";
import { urlFor } from "../lib/client";

const FooterBanner = ({
  footerBanner: {
    buttonText,
    product,
    desc,
    discount,
    image,
    largeText1,
    largeText2,
    midText,
    saleTime,
    smallText,
  },
}) => {
  return (
    <div className="w-90  p-6 bg-red-600 text-white rounded-2xl mt-28">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between relative">
        <div className="mr-5 p-3">
          <p className="text-lg"> {discount} </p>
          <h3 className="text-5xl font-extrabold"> {largeText1} </h3>
          <h3 className="text-5xl font-extrabold"> {largeText2} </h3>
          <p className="text-lg"> {saleTime} </p>
        </div>
        <div className="w-8/12 lg:mt-20 p-3">
          <p className="text-lg"> {smallText} </p>
          <h3 className="text-2xl font-bold"> {midText} </h3>
          <p> {desc} </p>
          <Link href={`/product/${product}`}>
            <button
              type="button"
              className="bg-white  text-red-600 rounded-2xl p-2 my-5 cursor-pointer font-semibold hover:scale-105 transition-all duration-300"
            >
              {buttonText}{" "}
            </button>
          </Link>
        </div>
        <img
          src={urlFor(image).url()}
          alt="banner"
          className="lg:absolute m-auto left-0 right-0 -top-24"
        />
      </div>
    </div>
  );
};

export default FooterBanner;
