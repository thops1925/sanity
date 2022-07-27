import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setqty] = useState(1);

  const onAdd = (product, quantity) => {
    const checkProduct = cart.find((item) => item._id === product._id);

    if (checkProduct) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

      const updateCartItems = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        }
      });
      setCart(updateCartItems);
    } else {
      product.quantity = quantity;
      setCart([...cart, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

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
      value={{
        cart,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        showCart,
        setShowCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
