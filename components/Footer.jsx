import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col text-center items-center p-6 mt-2">
      <p className="font-mono p-2">2023 Morakniv Knives All right reserved</p>
      <p className="flex flex-row p-2">
        <AiFillInstagram size={40} />
        <AiOutlineTwitter size={40} />
      </p>
    </div>
  );
};

export default Footer;
