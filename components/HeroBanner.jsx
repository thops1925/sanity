import Link from 'next/link';
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL </p>
        <h3>Mid text</h3>
        <img
          src=" C:\Users\Michelle Gozo\Downloads\gfx_100_rightoblevfgf110mm.jpg"
          alt="camera"
          className="hero-banner-image"
        />
        <div>
          <Link href="/product/ID">
            <button type="button"> Button Text</button>
          </Link>
          <div className="desc">
            <h5>description</h5>
            <p> Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
