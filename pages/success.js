import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runConfetti } from "../lib/utils";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    runConfetti();
  }, []);

  return (
    <div className="items-center mt-10 bg-neutral-200 rounded-xl w-1/2 ml-auto mr-auto p-7">
      <div className="flex flex-col justify-center items-center content-center gap-7">
        <p className="">
          <BsBagCheckFill size={70} color="green" />
        </p>
        <h2 className="text-3xl font-bol">Blagosiljam</h2>
        <p>
          Tike tike tacke, nema vise vracke!
          <a href="mailto:order@example.com" className="text-blue-600">
            order@example.com
          </a>{" "}
        </p>
        <Link href="/">
          <button
            type="button"
            className="cursor-pointer bg-red-600 rounded-xl p-2 transition-all duration-500 hover:scale-105 text-white mt-3"
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
