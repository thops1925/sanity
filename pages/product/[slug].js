import React from 'react';
import { client, urlFor } from '../../lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
} from 'react-icons/ai';
import comma from 'comma-number';
import Product from '../../components/Product';

const ProductDetails = ({ product, products }) => {
  const { name, details, price, image } = product;
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image && image[0])} />
          </div>
          {/* <div className="small-images-container">
            {image?.map((image, index) => (
              <img key={index} src={urlFor(image)} onMouseEnter="" />
            ))}
          </div> */}
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
          <p className="price">₱ {comma(price)}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
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

          <div className="buttons">
            <button className="add-to-cart" type="button" onClick="">
              Add to Cart
            </button>
            <button className="buy-now" type="button" onClick="">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You May also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item.id} product={item} />
            ))}
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
    }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
export default ProductDetails;
