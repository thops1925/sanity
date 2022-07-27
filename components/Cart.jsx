import React, { useRef } from 'react';
import Link from 'next/link';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';

const Cart = () => {
  const cartRef = useRef();
  const { setShowCart, cart, totalQuantity, totalPrice } = useStateContext();
  console.log(totalQuantity);
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantity}item)</span>
        </button>
        {cart.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping />
            <h3> Your Shopping bag is Empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cart.length >= 1 &&
            cart.map((product) => (
              <div className="product" key={product._id}>
                <img
                  src={urlFor(product?.image[0])}
                  className="cart-product-image"
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{product.name}</h5>
                    <h4>{product.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="quantity-desc">
                      <span className="minus">
                        <AiOutlineMinus />
                      </span>
                      <span className="num"></span>
                      <span className="plus">
                        <AiOutlinePlus />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
