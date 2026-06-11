import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function PizzaDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;
  

  const pizza = location.state?.pizza || location.state;
  const from = location.state?.from;
  const showSize = pizza?.hasSize;
const showCrust = pizza?.hasCrust;

  const { cartItems, addToCart, updateCartItem } = useContext(CartContext);

 const cartItem = cartItems.find(
  (item) => item._id === pizza._id
);

const [size, setSize] = useState(cartItem?.size || "Regular");

const [crust, setCrust] = useState(cartItem?.crust || "New Hand Tossed");


  const sizePriceMap = {
    Regular: 0,
    Medium: 50,
    Large: 100,
  };

  const crustPriceMap = {
    "New Hand Tossed": 0,
    "Cheese Burst": 80,
    "Thin Crust": 30,
  };

  const finalPrice =
    pizza
      ? pizza.price +
        (sizePriceMap[size] || 0) +
        (crustPriceMap[crust] || 0)
      : 0;

  const handleUpdate = () => {
  if (isInCart) {
    updateCartItem(
      pizza._id,
      cartItem?.size || "NA",
      cartItem?.crust || "NA",
      {
        ...pizza,
        size,
        crust,
        price: finalPrice,
      }
    );
  } else {
    addToCart({
      ...pizza,
      size,
      crust,
      price: finalPrice,
    });
  }
if (from === "home") {
  navigate("/");
} else {

  navigate("/menu", {
  state: {
    category
  }
});}
};

const isInCart = cartItems.some(
  (item) => item._id === pizza._id
);


  return (
    <div className="bg-white">

  {/* TOP HERO SECTION (Domino’s style) */}
<div className="relative h-[85vh]">

  {/* Pizza Image */}
  <img
    src={pizza.imageUrl}
    alt={pizza.name}
    className="w-full h-full object-cover"
  />

  {/* Dark gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

  {/* Close button */}
  <button
    onClick={() => navigate(-1)}
    className="absolute top-3 right-3 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
  >
    <i className="fa-solid fa-xmark"></i>
  </button>

  {/* TEXT CONTENT OVER IMAGE */}
  <div className="absolute bottom-0 left-0 w-full p-4 text-white">

    {/* Veg / Non-Veg badge */}
    <div className="px-3 py-2">

      <div className="flex items-center gap-2">
      <div className="bg-white p-[1px] rounded-sm">
        <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center
          ${ pizza.isVeg ? "border-green-600" : "border-[#8B4513]"}`}>
          {pizza.isVeg ? (<div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>) : (
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]">
          </div>)}
        </div>
      </div>
      <h1 className="text-lg font-bold">{pizza.name}</h1>
      </div>
      <p className="text-xs text-gray-200 line-clamp-2">{pizza.description}</p></div>

  </div>
</div>
      {/* Content */}
      <div className="p-4">
          {showSize && showCrust && ( <>
        {/* Size Selector */}
        <div className="mt-2">
  <h2 className="font-semibold mb-3">Change Size</h2>

  <div className="flex flex-col gap-3">

    {["Large", "Medium", "Regular"].map((s) => (
      <label
        key={s}
        className="flex justify-between items-center border p-3 rounded-lg w-full"
      >
        <span>{s}</span>

        <input
          type="radio"
          name="size"
          checked={size === s}
          onChange={() => {
  setSize(s);
}}
        />
      </label>
    ))}

  </div>
</div>
{/* Crust Selector */}
<div className="mt-5">
  <h2 className="font-semibold mb-3">Change Crust</h2>

  <div className="flex flex-col gap-3">

    {["New Hand Tossed", "Cheese Burst", "Thin Crust"].map((c) => (
      <label
        key={c}
        className="flex justify-between items-center border p-3 rounded-lg w-full"
      >
        <span>{c}</span>

        <input
          type="radio"
          name="crust"
          checked={crust === c}
          onChange={() => {
  setCrust(c);
}}
        />
      </label>
    ))}

  </div>
</div></>
  )}

      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 mt-auto left-0 w-full bg-white border-t p-3 flex items-center justify-between">

        <div>
          <p className="font-bold">₹{finalPrice}</p>
          {showSize && showCrust && ( <p className="text-xs text-gray-500">{size} | {crust}</p>)}
        </div>

        
          <button onClick={handleUpdate}
            className="bg-[#E31837] text-white px-6 py-2 rounded-md"
          >
           {isInCart ? "Update" : "Add"}
          </button>
        
      </div>
    </div>
  );
}

export default PizzaDetails;