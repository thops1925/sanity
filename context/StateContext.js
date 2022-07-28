import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setqty] = useState(1);

  let productFound;
  let index;

  // const onAdd = (product, quantity) => {
  //   const checkProduct = cart.find((item) => item._id === product._id);

  //   if (checkProduct) {
  //     setTotalPrice(
  //       (prevTotalPrice) => prevTotalPrice + product.price * quantity
  //     );
  //     setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

  //     const updateCartItems = cart.map((items) => {
  //       if (items._id === product._id) {
  //         return { ...items, quantity: items.quantity + quantity };
  //       }
  //     });
  //     setCart(updateCartItems);
  //   } else {
  //     product.quantity = quantity;
  //     setCart([...cart, { ...product }]);
  //   }
  //   toast.success(`${qty} ${product.name} added to cart`);
  // };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cart.find((item) => item._id === product._id);

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cart.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cart, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // const toggleCartItem = (id, value) => {
  //   productFound = cart.find((item) => item._id === id);
  //   const newCart = cart.filter((item) => item._id !== id);

  //   if (value === 'inc') {
  //     setCartItems([
  //       ...newCart,
  //       { ...productFound, quantity: productFound.quantity + 1 },
  //     ]);
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + productFound.price);
  //     setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
  //   } else if (value === 'dec') {
  //     if (productFound.quantity > 1) {
  //       setCartItems([
  //         ...newCart,
  //         { ...productFound, quantity: productFound.quantity - 1 },
  //       ]);
  //       setTotalPrice((prevTotalPrice) => prevTotalPrice - productFound.price);
  //       setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
  //     }
  //   }
  // };

  const toggleCartItem = (id, value) => {
    if (value === 'inc') {
      const newCartItems = cart.map((product) => {
        if (product._id === id) {
          setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
          setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1);
          product.quantity += 1;
        }
        return product;
      });

      setCartItems(newCartItems);
    } else if (value === 'dec') {
      const newCartItems = cart.map((product) => {
        if (product._id === id && product.quantity > 1) {
          setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
          setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);
          product.quantity -= 1;
        }
        return product;
      });
      setCartItems(newCartItems);
    }
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
        toggleCartItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
