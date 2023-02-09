import React from "react";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { Btn, Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { urlFor, client } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);
  const { increaseQuantity, decreaseQuantity, quantity, onAdd, setShowCart } =
    useStateContext();

  const buyNowHandler = () => {
    onAdd(product, quantity);

    setShowCart(true);
  };

  const { image, name, details, price } = product;

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div>
          <img
            src={urlFor(image && image[index]).url()}
            height={1300}
            width={1300}
            alt="product"
            className="ml-auto mr-auto object-cover w-8/12"
          />
        </div>

        {/* Marquee, but I didn't like it */}
        {/* <div className="flex gap-8 mt-6">
          {image?.map((item, i) => (
            <img
              src={urlFor(item).url()}
              alt="product"
              className={
                i === index ? `${smallImage} bg-neutral-400` : smallImage
              }
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div> */}

        <div className="flex-col p-6 mt-5">
          <h1 className="font-bold text-xl"> {name} </h1>
          <div className="flex items-center justify-start">
            <div className="flex mr-4 text-red-600 p-2">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p> (20) </p>
          </div>
          <h3 className="font-semibold mb-2">Details: </h3>
          <p> {details} </p>
          <p className="font-bold p-2"> ${price} </p>
          <div className="flex items-center h-40 w-80">
            <h3 className="font-bold"> Quantity: </h3>
            <p className="flex items-center justify-between p-2 ml-5">
              <span
                className="cursor-pointer border-2 border-gray-600 rounded-md p-1 hover:bg-gray-300 hover:scale-105 transition-all duration-500"
                onClick={decreaseQuantity}
              >
                <AiOutlineMinus size={20} />
              </span>
              <span
                className="border-2 w-7 text-center p-1 border-gray-600 flex-1"
                style={{ margin: "0px 6px 0 6px" }}
              >
                {quantity}
              </span>
              <span
                className="border-2 border-gray-600 cursor-pointer rounded-md p-1 hover:bg-gray-300 hover:scale-105 transition-all duration-500"
                onClick={increaseQuantity}
              >
                <AiOutlinePlus size={20} onClick={() => increaseQuantity} />
              </span>
            </p>
          </div>
          <div className="flex justify-center mt-10">
            <Btn
              text={"Add to Cart"}
              variant={false}
              product={product}
              onClick={() => onAdd(product, quantity)}
            />
            <Btn
              text={"Buy Now"}
              variant={true}
              buyNow={buyNowHandler}
              product={product}
              onClick={() => buyNowHandler()}
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center font-bold text-2xl p-3 my-5">
          You may also like
        </h2>
        <div className="flex flex-col justify-center items-center lg:flex-row my-5">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  } `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type ==  "product" && slug.current == '${slug}'][0]`;
  const productsQuery = "*[_type == 'product']";

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
