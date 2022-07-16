import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <p>
        <Link href="/">Camera</Link>
      </p>
      <button className="cart-icon" type="button">
        <AiOutlineShopping />
        <span className="cart-item-qty">0</span>
      </button>
    </div>
  );
};

export default Navbar;
