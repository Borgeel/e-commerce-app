import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="w-full flex flex-col p-2">
      <p className="knife-solo"> {heroBanner.smallText} </p>
      <h3 className="text-bold"> {heroBanner.midText} </h3>
      <h1> {heroBanner.largeText1} </h1>
      <h1> {heroBanner.largeText2} </h1>

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <img
        src={urlFor(heroBanner.image).url()}
        alt="knife"
        className="hero-banner-image"
      />

      <div>
        <Link href={`/product/${heroBanner.product}`}>
          <button type="button">{heroBanner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5> Description </h5>
          <p> {heroBanner.desc} </p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
