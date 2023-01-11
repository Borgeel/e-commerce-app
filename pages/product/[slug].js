import React from "react";
import { useState } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { Btn, Product } from "../../components";

import { urlFor, client } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const [index, setIndex] = useState(0);

  const { image, name, details, price } = product;

  const smallImage =
    "border-2 rounded-lg bg-neutral-200 w-40 h-40 cursor-pointer";

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="p-6">
          <img
            src={urlFor(image && image[index]).url()}
            alt="product"
            className="object-cover"
          />
        </div>

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
          <div className="flex justify-around items-center">
            <h3> Quantity: </h3>
            <p className="flex items-center justify-between p-2 border-2 rounded-md">
              <span className="cursor-pointer border-2 h-full">
                <AiOutlineMinus />
              </span>
              <span className="rounded-sm border-2 w-7 h-7 mx-5 text-center">
                0
              </span>
              <span className="border-2 cursor-pointer">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <Btn text={"Add to Cart"} variant={false} />
            <Btn text={"Buy Now"} variant={true} />
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

  console.log(product);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
