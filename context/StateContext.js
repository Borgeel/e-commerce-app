import React, { useState, useEffect, useContext, createContext } from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setTotalPrice(Math.round(totalPrice * 100) / 100);
  }, [totalPrice]);

  let foundProduct;
  let index;

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decreaseQuantity = () => {
    setQuantity((prevState) => {
      if (prevState - 1 < 1) return 1;
      return prevState - 1;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems?.find(
      (item) => item._id === product._id
    );
    setTotalPrice((prevTotalPrice) => {
      return prevTotalPrice + product.price * quantity;
    });
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
      setQuantity(0);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      setQuantity(1);
    }
    toast.success(`${quantity} ${product.name} added to the cart`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => {
      return prevTotalPrice - foundProduct.price * foundProduct.quantity;
    });
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "increment") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct?.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct?.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "decrement" && foundProduct?.quantity > 1) {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct?.quantity - 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
    }

    // if (foundProduct.quantity > 1) {
    //   setCartItems([
    //     ...newCartItems,
    //     { ...foundProduct, quantity: foundProduct?.quantity - 1 },
    //   ]);
    //   setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
    //   setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
    // }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantity,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
