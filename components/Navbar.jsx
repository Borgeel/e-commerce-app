import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="hidden lg:flex justify-between items-center p-1 mx-3">
      <p className="logo">
        <Link href="/"> Morakniv Knives </Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShopping />
        <span className="cart-item-qty"> 1 </span>
      </button>
    </div>
  );
};

export default Navbar;
