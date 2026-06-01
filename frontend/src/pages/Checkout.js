import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, setCartItems, address} = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("");

  // ---------------- COD ----------------
  const handleCOD = async () => {

  const success = await placeOrderToBackend();

  if (success) {

  localStorage.removeItem("cart");

  setCartItems([]);

  alert("Order placed successfully 🚚");

  navigate("/success");
}
};

  // ---------------- RAZORPAY ----------------
const handlePayment = async () => {
  if (!paymentMethod) {
    alert("Please select a payment method");
    return;
  }

  if (paymentMethod === "COD") {
    handleCOD();
    return;
  }

  try {
    const response = await fetch(
      "https://pizza-palace-3.onrender.com/api/payment/create-order",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // IMPORTANT
        body: JSON.stringify({
          amount: finalTotal,
        }),
      }
    );

    const order = await response.json();

    const options = {
      key: "rzp_test_SvUIwncC0p1kCW",
      amount: order.amount,
      currency: order.currency,
      name: "Pizza Palace",
      description: "Pizza Order",
      image:
        "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
      order_id: order.id,

      prefill: {
        name: "Demo User",
        email: "demo@razorpay.com",
        contact: "9876543210",
      },

      handler: async function () {

  const success = await placeOrderToBackend();

  if (success) {

    localStorage.removeItem("cart");

    setCartItems([]);

    alert("Payment Successful ✅");

    navigate("/success");
  }
},

      theme: {
        color: "#E31837",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

  } catch (err) {
    console.log(err);
    alert("Payment Failed");
  }
};

  const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);

const tax = subtotal * 0.05;

const packagingCharge = 20;

const totalTaxAndCharges =
  tax + packagingCharge;

const discount = 30;

const finalTotal =
  subtotal +
  tax +
  packagingCharge -
  discount;

const [showDiscount, setShowDiscount] =
  useState(false);

const [showTaxes, setShowTaxes] =
  useState(false);

const placeOrderToBackend = async () => {
  try {

    const user = JSON.parse(localStorage.getItem("user"));

    const orderData = {
      items: cartItems,
      totalAmount: finalTotal,
      status: "Pending",
      paymentMethod,
      email: user?.email,
    };

    const res = await fetch(
      "https://pizza-palace-3.onrender.com/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!res.ok) {
      throw new Error("Order failed");
    }

    return true;

  } catch (err) {
    console.log(err);
    return false;
  }
};
  

  return (
    <div>
        <nav className="flex px-3 py-5 items-center gap-3" onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i>
                <p className="text-xl font-semibold">Checkout</p>
      </nav>
    <div className="min-h-screen bg-gray-100 pb-20">

      {/* PAGE CONTAINER */}
      <div className="md:flex-row flex flex-col gap-5 px-6 py-5">

        {/* ================= LEFT SIDE (70%) ================= */}
        <div className="md:w-[70%] bg-white">

          <h2 className=" font-semibold px-5 pt-3">
            Payment Options
          </h2>

          {[
  { id: "UPI", label: "UPI" },
  { id: "CREDIT CARD", label: "Credit Card" },
  { id: "DEBIT CARD", label: "Debit Card" },
  { id: "NETBANKING", label: "Net Banking" },
  { id: "WALLET", label: "Wallet" },
  { id: "COD", label: "Cash / UPI on Delivery" },
].map((method) => (
  <div
    key={method.id}
    onClick={() => setPaymentMethod(method.id)}
    className={`flex items-center justify-between border-b py-6 px-7 rounded-md cursor-pointer border-gray-200 ${
      paymentMethod === method.id
    }`}
  >

    {/* LEFT SIDE LABEL */}
    <p className="text-sm">
      {method.label}
    </p>

    {/* ROUND CHECK BUTTON */}
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
        paymentMethod === method.id
          ? "border-green-600"
          : "border-gray-400"
      }`}
    >
      {paymentMethod === method.id && (
        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
      )}
    </div>

  </div>
))}
        </div>

        {/* ================= RIGHT SIDE (30%) ================= */}
        <div className="md:w-[30%]">

          {/* DELIVERY BOX */}
          <div className="bg-white p-4 rounded-lg">
  <div className="flex items-center gap-2 border-b border-dashed pb-2">
    <i className="fa-solid fa-location-dot text-red-700"></i>

    <h3 className="line-clamp-1">
      Deliver to{" "}
      <span className="font-semibold">Home, </span>
      <span>{address || "No Address Added"}</span>
    </h3>
  </div>

  <div className="flex items-center gap-2 pt-2">
    <i className="fa-regular fa-clock"></i>
    <p>Deliver Now</p>
  </div>
</div>
          {/* ORDER SUMMARY */}
          <div className="bg-white p-5 mt-5">

  <p className="font-semibold pb-3">Order Summary</p>

  {/* ITEMS */}
  {cartItems.map((item) => (
  <div key={item._id} className="flex justify-between items-center pb-2">
    <div>
      <p className="text-sm ">{item.name}</p>
      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
    </div>
    <p className="text-sm font-semibold">₹{item.price * item.quantity}</p>
  </div>))}

  <div className="border-t border-dashed pt-4 mt-2">
    <div className="flex justify-between pb-2">
      <p className="text-xs text-gray-500">Item(s) Total</p>
      <p className="text-xs">₹{subtotal}</p>
    </div>

    {discount > 0 && (
    <div>
    <div className="flex justify-between pb-2 cursor-pointer" onClick={() => setShowDiscount(!showDiscount)}>
    <div className="flex gap-1 items-center">
      <p className="text-xs text-gray-500">Discount Applied</p>
      <i className={`fa-solid ${showDiscount ? "fa-angle-up" : "fa-angle-down"} text-xs text-gray-500`}></i>
      </div>
      <p className="text-xs text-green-700">-₹{discount}</p>
    </div>

    {showDiscount && (
    <div className="text-xs text-gray-500 pl-3 pb-2">
    <div className="flex items-center gap-2">
      <i className="fa-solid fa-check text-green-600"></i>
      <p>Coupon GET30 - ₹{discount}</p>
      </div>
    </div>)}
    </div>
    )}

    {/* DELIVERY */}
    <div className="flex justify-between pb-2">
      <p className="text-xs text-gray-500">Delivery Charges</p>
      <p className="text-xs text-green-700">FREE</p>
    </div>

    {/* TAXES */}
    <div>
    <div className="flex justify-between pb-3 border-b border-gray-100 cursor-pointer" onClick={() => setShowTaxes(!showTaxes)}>
    <div className="flex gap-1 items-center">
      <p className="text-xs text-gray-500">Taxes & Charges</p>
      <i className={`fa-solid ${ showTaxes ? "fa-angle-up" : "fa-angle-down"} text-xs text-gray-500`}></i>
      </div>
      <p className="text-xs text-gray-500">₹{totalTaxAndCharges.toFixed(2)}</p>
    </div>

    {showTaxes && (
    <div className="text-xs text-gray-500 pl-3 pb-2 space-y-1">
      <div className="flex justify-between">
        <p>Taxes</p>
        <p>₹{tax.toFixed(2)}</p>
      </div>
      <div className="flex justify-between">
        <p>Packaging Charges</p>
        <p>₹{packagingCharge.toFixed(2)}</p>
      </div>
    </div>)}
    </div>

    {/* TOTAL */}
    <div className="flex justify-between pt-2">
      <p className="font-semibold text-sm">Total</p>
      <p className="font-semibold text-sm">₹{finalTotal.toFixed(2)}</p>
    </div>

  </div>
</div>
          
        </div>
      </div>

      {/* ================= STICKY BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-between items-center px-6 py-3">

        <div className="text-sm font-medium">
          {paymentMethod || "Select Payment Method"}
        </div>

        <button
            onClick={handlePayment}
            className=" bg-[#E31837] text-white px-3 py-2 rounded-md font-semibold"
          >
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </button>
      </div>
</div>
    </div>
  );
}

export default Checkout;