import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState();
  const [totalPrice, settotalPrice] = useState();
  const [totalQuantity, settotalQuantity] = useState();
  const [qty, setqty] = useState(1);

  const incQty = () => {
    setqty((prev) => prev + 1);
  };

  const decQty = () => {
    setqty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{ showCart, cart, totalPrice, totalQuantity, qty, incQty, decQty }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
