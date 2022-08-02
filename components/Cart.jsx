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
import getStripe from '../lib/getStripe';
import axios from 'axios';

const Cart = () => {
  const cartRef = useRef();
  const {
    setShowCart,
    cart,
    totalQuantity,
    totalPrice,
    toggleCartItem,
    onRemove,
  } = useStateContext();

  const handleCheckOut = async () => {
    const stripe = await getStripe();
    const response = axios.post('/api/stripe/', cart);
    const { data } = await response;
    const { error } = data;
    if (error) {
      toast.error(error);
    }
    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

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
          <span className="cart-num-items">
            ({totalQuantity.toLocaleString()} item)
          </span>
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
                    <h4>₱{product.price.toLocaleString()}</h4>
                  </div>
                  <div className="flex bottom">
                    <div className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() => toggleCartItem(product._id, 'dec')}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{product.quantity}</span>
                      <span
                        className="plus"
                        onClick={() => toggleCartItem(product._id, 'inc')}
                      >
                        <AiOutlinePlus />
                      </span>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => onRemove(product)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {cart.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>SubTotal:</h3>
                <h3>₱{totalPrice.toLocaleString()}</h3>
              </div>
              <div className="btn-container">
                <button type="button" className="btn" onClick={handleCheckOut}>
                  Pay With Stripe
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
