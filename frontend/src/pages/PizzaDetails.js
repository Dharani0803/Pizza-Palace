import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function PizzaDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const pizza = state;

  const cartItem = cartItems.find((item) => item._id === pizza._id);

  return (
    <div className="min-h-screen bg-white">

      {/* BACK */}
      <div className="p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <p className="font-semibold">Pizza Details</p>
      </div>

      {/* IMAGE */}
      <img
        src={pizza.imageUrl} alt="Pizza item"
        className="w-full h-[370px] object-cover"
      />

      {/* CONTENT */}
      <div className="p-3">

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{pizza.name}</h1>
          <p className="text-xl font-bold">₹{pizza.price}</p>
        </div>

        <p className="text-gray-600 mt-3">
          {pizza.description}
        </p>

        {/* ADD BUTTON */}
        <div className="mt-5">

          {cartItem ? (
            <div className="flex justify-between items-center gap-4 border py-2 rounded-md w-full">

              <button onClick={() => decreaseQuantity(pizza._id)}>
                -
              </button>

              <span>{cartItem.quantity}</span>

              <button onClick={() => increaseQuantity(pizza._id)}>
                +
              </button>

            </div>
          ) : (
            <button
              onClick={() => addToCart(pizza)}
              className="bg-[#E31837] text-white py-2 w-full rounded-md"
            >
              Add +
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default PizzaDetails;