import React from 'react';
import { client } from '../lib/client';
import { FooterBanner, HeroBanner, Product } from '../components';

const Home = ({ products, bannerData }) => {
  return (
    <div>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2 className="">Cameras</h2>
        <p className="">
          The central themes of the GFX & X Series are simplicity and elegance;
          the camera is a precision instrument, but one that’s combined with a
          functional beauty.
        </p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner />
    </div>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);
  return { props: { products, bannerData } };
};

export default Home;
