import { createContext, useState,  useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [appliedOffer, setAppliedOffer] = useState("");

  const [cartItems, setCartItems] = useState(() => {
  return JSON.parse(localStorage.getItem("cart")) || [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]);

  const addToCart = (pizza) => {

    const existing = cartItems.find(
      (item) => item._id === pizza._id
    );

    if (existing) {

      setCartItems(
        cartItems.map((item) =>
          item._id === pizza._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      setCartItems([
        ...cartItems,
        { ...pizza, quantity: 1 }
      ]);

    }
  };

  const increaseQuantity = (_id) => {

    setCartItems(
      cartItems.map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (_id) => {

    const updated = cartItems
      .map((item) =>
        item._id === _id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updated);
  };

  const [address, setAddress] = useState(
  localStorage.getItem("address") || ""
);

const saveAddress = (addr) => {
  const cleanAddr = addr.trim();
  if (!addr) return;

  setAddress(addr);
  localStorage.setItem("address", addr);
};

const [deliveryTime, setDeliveryTime] = useState("Now");

  return (

    <CartContext.Provider
  value={{
    cartItems,
    setCartItems, // ✅ ADD THIS LINE
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    appliedOffer,
    setAppliedOffer,
    address,
    saveAddress,
    deliveryTime,
    setDeliveryTime
  }}
>

      {children}

    </CartContext.Provider>
  );
}

export default CartProvider;