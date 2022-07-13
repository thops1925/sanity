import React from 'react';

const Home = () => {
  return (
    <>
      HeroBanner
      <div>
        <h2>GFX System </h2>
        <p>
          Large format mirrorless digital camera system that achieves the
          world’s highest level of image quality.
        </p>
      </div>
      <div>
        {[
          'product1',
          'product2',
          'product3',
          'product4',
          'product5',
          'product6',
        ].map((product) => product)}
      </div>
      Footer
    </>
  );
};

export default Home;
