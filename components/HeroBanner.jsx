import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center w-90 min-h-screen justify-between p-6 bg-neutral-300 rounded-2xl relative">
      <div className="flex flex-col self-center mt-20">
        <p className="text-2xl md:text-4xl m-3"> {heroBanner.smallText} </p>
        <h3 className="text-3xl md:text-6xl font-semibold m-3 p-3">
          {heroBanner.midText}
        </h3>
        <div className="text-5xl  md:text-9xl -ml-5 font-bold m-3 p-3 capitalize text-white">
          <h1>{heroBanner.largeText1}</h1>
          <h1>{heroBanner.largeText2}</h1>
        </div>
      </div>
      <img
        src={urlFor(heroBanner.image).url()}
        alt="knife"
        width={450}
        height={450}
        className="object-cover w-full lg:absolute lg:w-1/2 top-40 right-40 z-5 mt-5"
      />
      <div className="p-2 flex-1 lg:flex-col lg:self-end mb-8 ml-5">
        <Link href={`/product/${heroBanner.product}`}>
          <button
            type="button"
            className="lg:absolute bottom-32 right-16 z-20 self-center bg-red-600  text-white rounded-2xl p-2 my-10 cursor-pointer font-semibold hover:scale-105 transition-all duration-300"
          >
            {heroBanner.buttonText}
          </button>
        </Link>
        <div>
          <h5 className="text-3xl text-blue-900 font-semibold mb-2">
            Description
          </h5>
          <p> {heroBanner.desc} </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
