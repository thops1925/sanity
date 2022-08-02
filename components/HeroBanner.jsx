import Link from 'next/link';
import React from 'react';
import { urlFor } from '../lib/client';

const HeroBanner = ({ bannerData }) => {
  const imgFind = urlFor(bannerData.image);
  return (
    <div className="hero-banner-container">
      <p className="beats-solo">{bannerData.smallText}</p>
      <h3>{bannerData.midText}</h3>
      <h1>{bannerData.largeText1}</h1>

      <img src={imgFind} alt="" className="hero-banner-image" />
      <div>
        {/* <Link href={`/product/${bannerData.product}`}>
          <button type="button">{bannerData.buttonText}</button>
        </Link> */}
        <div className="desc">
          <h5>Description</h5>
          <p>{bannerData.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
