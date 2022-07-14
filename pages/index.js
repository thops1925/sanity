import React from 'react';
import { client } from '../lib/client';
import { FooterBanner, HeroBanner, Product } from '../components';

const Home = () => {
  return (
    <div>
      <HeroBanner />

      <div className="products-heading">
        <h2 className="">Cameras</h2>
        <p className="">
          The central themes of the GFX & X Series are simplicity and elegance;
          the camera is a precision instrument, but one that’s combined with a
          functional beauty.
        </p>
      </div>
      <div className="products-container">
        {['product 1', 'product 2', 'product 3', 'product 4'].map(
          (product) => product
        )}
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
};

export default Home;
