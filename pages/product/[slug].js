import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';
import Product from '../../components/Product';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { name, details, price, image } = product;
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>

          <div className="small-images-container">
            {image?.map((image, i) => (
              <Image
                key={i}
                src={urlFor(image)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(10)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">₱ {price.toLocaleString()}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button className="buy-now" type="button" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You May also like</h2>
        <div className="marquee">
          <div className="maylike-products-container">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  // get static paths
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }`; // query

  const products = await client.fetch(query); // fetch products

  const paths = products.map((product) => ({
    // map products
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    // return paths
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`; // get product by slug
  const productsQuery = '*[_type == "product"]'; // get all products

  const product = await client.fetch(query); // fetch product
  const products = await client.fetch(productsQuery); // fetch all products/

  return {
    props: { products, product }, // pass props to component
  };
};
export default ProductDetails;
