import React from "react";

const Btn = ({ text, variant }) => {
  return (
    <button
      type="button"
      className={`border-2 rounded-md p-2 hover:scale-105 transition-all duration-500 mx-3 w-40 ${
        variant ? "bg-red-600 text-white" : "text-red-600"
      }`}
      onClick=""
    >
      {text}
    </button>
  );
};

export default Btn;
