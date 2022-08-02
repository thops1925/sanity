import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setqty] = useState(1);

  // const onAdd = (product, qty) => {
  //   const newItem = cart.find((i) => i.id === product._id); // find item in cart
  //   if (newItem) {
  //     // if item is in cart
  //     newItem.qty += qty; // add qty to item
  //   } else {
  //     // if item is not in cart
  //     cart.push({ ...product, qty }); // add item to cart
  //   } // end if
  //   setCartItems(cart); // set cart items
  //   setTotalPrice(totalPrice + product.price * qty); // set total price
  //   setTotalQuantity(totalQuantity + qty); // set total quantity
  //   toast.success(`${product.name} added to cart`); // toast message
  // };

  const onAdd = (product, quantity) => {
    // add item to cart
    const checkProductInCart = cart.find((item) => item._id === product._id); // find item in cart
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    ); // set total price
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity); // set total quantity

    if (checkProductInCart) {
      // if item is in cart
      const updatedCartItems = cart.map((cartProduct) => {
        // map cart items
        if (cartProduct._id === product._id)
          // if item is in cart
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }; // add qty to item
      });
      setCartItems(updatedCartItems); // set cart items
    } else {
      // if item is not in cart
      product.quantity = quantity; // set quantity
      setCartItems([...cart, { ...product }]); // set cart items
    } // end if

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    const updatedCartItems = cart.filter((item) => item._id !== product._id); // remove item from cart
    setCartItems(updatedCartItems); // set cart items
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
    ); // set total price
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - product.quantity
    ); // set total quantity
    toast.success(`${product.name} removed from the cart.`);
  };

  const toggleCartItem = (id, value) => {
    // toggle cart item
    if (value === 'inc') {
      // if value is inc
      const newCartItems = cart.map((product) => {
        // map cart items
        if (product._id === id) {
          // if product id is equal to id
          setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price); // set total price
          setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1); // set total quantity
          product.quantity += 1; // add 1 to quantity
        }
        return product; // return product
      });

      setCartItems(newCartItems); // set cart items
    } else if (value === 'dec') {
      // if value is dec
      const newCartItems = cart.map((product) => {
        // map cart items
        if (product._id === id && product.quantity > 1) {
          // if product id is equal to id and quantity is greater than 1
          setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price); // set total price
          setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1); // set total quantity
          product.quantity -= 1; // subtract 1 from quantity
        }
        return product; // return product
      });
      setCartItems(newCartItems); // set cart items
    }
  };

  const incQty = () => {
    // increment quantity
    setqty((prev) => prev + 1); // set qty to previous qty + 1
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
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
