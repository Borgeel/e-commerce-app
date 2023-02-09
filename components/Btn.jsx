import React from "react";
import { useStateContext } from "../context/StateContext";

const Btn = ({ text, variant, product, buyNow, onClick }) => {
  const { quantity } = useStateContext();

  return (
    <button
      type="button"
      className={`border-2 rounded-md p-2 hover:scale-105 transition-all duration-500 mx-3 w-40 ${
        variant ? "bg-red-600 text-white" : "text-red-600"
      }`}
      // onClick={() => buyNow(product, quantity)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Btn;
