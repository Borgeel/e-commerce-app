import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="hidden lg:flex justify-between items-center p-1 mx-3">
      <p className="text-3xl font-extrabold">
        <Link href="/"> Morakniv Knives </Link>
      </p>
      <div className="relative">
        <button type="button" className="relative">
          <AiOutlineShopping size={50} />
          <span className="absolute bottom-0 right-0 rounded-full border-2 bg-red-600 w-7 h-7 text-center items-center">
            1
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
