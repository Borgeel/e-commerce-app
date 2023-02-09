import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

import { Cart } from "./";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext();

  return (
    <div className="flex lg:flex justify-between items-center p-1 mx-3">
      <p className="text-3xl font-extrabold">
        <Link href="/"> Morakniv Knives </Link>
      </p>

      <div className="relative">
        <button
          type="button"
          className="relative"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping size={50} />
          <span
            className={
              totalQuantity === 0
                ? "hidden"
                : "absolute bottom-0 right-0 rounded-full border-2 bg-red-600 w-7 h-7 text-center items-center"
            }
          >
            {totalQuantity}
          </span>
        </button>
        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
