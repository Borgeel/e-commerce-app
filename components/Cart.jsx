import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutLineShopping,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();

  const {
    onRemove,
    totalPrice,
    totalQuantity,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting... ");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div
      ref={cartRef}
      className="w-full bg-neutral-900 fixed right-0 top-0 z-50 transition-all ease-in-out duration-700 bg-opacity-30"
    >
      <div className="h-screen w-1/2 bg-neutral-100 float-right px-5 py-3 relative">
        <button
          type="button"
          className="flex items-center text-center text-xl font-semibold cursor-pointer gap-1 ml-2 border-none bg-transparent"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="ml-2"> Your Cart </span>
          <span className="ml-2" style={{ color: "red" }}>
            ({totalQuantity}) items in your cart
          </span>
        </button>

        {cartItems.length < 1 && (
          <div className="flex flex-col text-center items-center h-full gap-4 mt-6">
            <AiOutlineShopping size={100} />
            <h3 className="text-xl font-semibold">
              Your shopping bag is empty.
            </h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="cursor-pointer border-2 bg-red-600 rounded-xl p-2 transition-all duration-500 hover:scale-105 text-white mt-3"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="flex flex-col grow-0 gap-1 mt-4 bg-neutral-300 overflow-y-scroll max-h-96 px-5 py-2">
          {cartItems?.length >= 1 &&
            cartItems?.map((item) => (
              <div className="flex gap-7 p-2" key={item._id}>
                <div className="relative w-48 h-44 hover:scale-105 transition-all ease-in-out duration-500">
                  <img
                    src={item && urlFor(item?.image[0]).url()}
                    alt="product"
                    width={192}
                    height={176}
                    className="rounded-xl p-2 object-cover bg-neutral-200"
                  />

                  <button
                    type="button"
                    className="absolute top-2 right-2 rounded-full cursor-pointer hover:scale-105 hover:bg-gray-300 duration-500"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline
                      size={28}
                      color="red"
                      className="rounded-full"
                    />
                  </button>
                </div>
                <div className="flex flex-col  w-11/12">
                  <div
                    className="flex justify-between w-11/12"
                    style={{ color: "#324d67" }}
                  >
                    <h5 className="text-2xl font-semibold"> {item?.name} </h5>
                    <h4 className="text-2xl font-bold whitespace-nowrap">
                      $ {item.price}
                    </h4>
                  </div>
                  <div className="flex justify-end mt-auto mb-11 w-11/12">
                    <div>
                      <p className="flex rounded-md ml-5">
                        <span
                          className="cursor-pointer border-2 border-gray-600 rounded-md p-1 hover:bg-gray-300 hover:scale-105 transition-all duration-500"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "decrement")
                          }
                        >
                          <AiOutlineMinus size={20} />
                        </span>
                        <span
                          className="border-2 w-7 text-center p-1 border-gray-600 flex-1"
                          style={{ margin: "0px 6px 0 6px" }}
                        >
                          {item?.quantity}
                        </span>
                        <span
                          className="border-2 border-gray-600 cursor-pointer rounded-md p-1 hover:bg-gray-300 hover:scale-105 transition-all duration-500"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "increment")
                          }
                        >
                          <AiOutlinePlus size={20} />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="absolute bottom-5 w-10/12 flex flex-col ml-4">
            <div className="flex justify-between ">
              <h3 className="text-xl font-semibold"> Subtotal: </h3>
              <h3 className="text-xl font-semibold"> € {totalPrice} </h3>
            </div>

            <div className="w-9/12 bg-red-600 self-center mt-5 text-center rounded-3xl">
              <button
                type="button"
                className="border-none text-white capitalize text-lg w-full p-2"
                onClick={handleCheckout}
              >
                Pay With Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
