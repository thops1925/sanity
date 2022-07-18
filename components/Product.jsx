import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import comma from 'comma-number';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            alt="camera"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name} </p>
          <p className="product-price">₱ {comma(price)}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
