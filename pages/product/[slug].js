import React from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

import { urlFor, client } from "../../lib/client";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;

  return (
    <div>
      <div className="product-detail-container">
        <div className="image-container">
          <img
            src={urlFor(image && image[0]).url()}
            alt="product"
            className="product-detail-image"
          />
        </div>
        {/* <div className="small-images-container">
            {image?.map((item, indexx) => (
              <img src={urlFor(item).url()} alt="product" className="" />
            ))}
          </div> */}

        <div className="product-detail-desc">
          <h1> {name} </h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p> (20) </p>
          </div>
          <h3>Details: </h3>
          <p> {details} </p>
          <p className="price"> ${price} </p>
          <div className="quantity">
            <h3> Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">0</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>
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