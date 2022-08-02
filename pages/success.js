import React, { useEffect } from 'react';
import { BsBagCheckFill } from 'react-icons/bs';
import Link from 'next/dist/client/link';
import { useStateContext } from '../context/StateContext';
const Success = () => {
  const { setCart, setTotalPrice, setTotalQuantity } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCart([]);
    setTotalPrice(0);
    setTotalQuantity(0);
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">
          We have sent you an email with your order details.
        </p>
        <p className="email-msg">
          Please check your spam folder if you don't see it in your inbox.
        </p>
        <p className="email-msg">
          If you have any questions, please contact us at{' '}
          <a href="mailto:thops@gmail.com">mailto:thops@gmail.com</a>
        </p>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
