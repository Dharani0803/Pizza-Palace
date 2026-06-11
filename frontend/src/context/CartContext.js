import { createContext, useState,  useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {

  const [appliedOffer, setAppliedOffer] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const normalize = (v) => v || "NA";
  
  const [cartItems, setCartItems] = useState(() => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
  });

  const showToast = (message) => {
  setToastMessage(message);

  setTimeout(() => {
    setToastMessage("");
  }, 2000);
};


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
  setCartItems((prev) => {
    const existingIndex = prev.findIndex(
      (item) =>
        item._id === newItem._id &&
        item.size === newItem.size &&
        item.crust === newItem.crust
    );

    if (existingIndex !== -1) {
      // only increase when user clicks + in Menu, NOT on update page
      const updated = [...prev];
      updated[existingIndex].quantity += 1;
      return updated;
    }

    return [...prev, { ...newItem, quantity: 1 }];
  });
};

const updateCartItem = (id, size, crust, updatedItem) => {

  console.log("=== updateCartItem ===");
  console.log("id:", id);
  console.log("size:", size);
  console.log("crust:", crust);
  console.log("updatedItem:", updatedItem);

  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id &&
      normalize(item.size) === normalize(size) &&
      normalize(item.crust) === normalize(crust)
        ? { ...item, ...updatedItem }
        : item
    )
  );
};

  const increaseQuantity = (id, size, crust) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id &&
      normalize(item.size) === normalize(size) &&
      normalize(item.crust) === normalize(crust)
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

  const decreaseQuantity = (id, size, crust) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id &&
        normalize(item.size) === normalize(size) &&
        normalize(item.crust) === normalize(crust)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  const [address, setAddress] = useState(
  localStorage.getItem("address") || ""
);

const saveAddress = (addr) => {
  const cleanAddr = addr.trim();
  if (!cleanAddr) return;
  setAddress(cleanAddr);
  localStorage.setItem("address", cleanAddr);
};
const [customerName, setCustomerName] = useState(
  localStorage.getItem("customerName") || ""
);

const saveCustomerName = (name) => {
  setCustomerName(name);
  localStorage.setItem("customerName", name);
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, 
        addToCart,
        updateCartItem,
        increaseQuantity,
        decreaseQuantity,
        appliedOffer,
        setAppliedOffer,
        address,
        saveAddress,
        customerName,
        saveCustomerName,
        showToast,
        toastMessage
      }}>

      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;