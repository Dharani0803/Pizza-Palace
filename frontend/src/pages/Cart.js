import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Delivery from "../assets/Delivery.png"
import Offer from "../assets/offer.svg"

function Cart(){
    const navigate = useNavigate();
    const {
  cartItems,
  increaseQuantity,
  decreaseQuantity,
  appliedOffer,
  setAppliedOffer
} = useContext(CartContext);
    const subtotal = cartItems.reduce( (total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const packagingCharge = 20;
    const totalTaxAndCharges = tax + packagingCharge;

    const [showDiscount, setShowDiscount] = useState(false);
    const [showTaxes, setShowTaxes] = useState(false);
    const [showDeliveryPopup, setShowDeliveryPopup] = useState(false);
    const [deliveryType, setDeliveryType] = useState("Now");
    const [selectedDate, setSelectedDate] = useState("Today");
    const [selectedTime, setSelectedTime] = useState("7:00 PM");

    const discount = appliedOffer === "GET30" ? 30 : 0;
    const deliverySaved = cartItems.length > 0 ? 45 : 0;
    const deliveryCharge = 0;
    const totalSavings = discount + deliverySaved;
    const finalTotal = subtotal + tax + packagingCharge - discount;

    const [showAddress, setShowAddress] = useState(false);
const { address, saveAddress } = useContext(CartContext);

const handleCheckout = () => {
  if (!address || address.trim() === "") {
    setShowAddress(true);
    return;
  }

  navigate("/checkout");
};
const [fullName, setFullName] = useState("");
const [mobile, setMobile] = useState("");
const [house, setHouse] = useState("");
const [street, setStreet] = useState("");
const [landmark, setLandmark] = useState("");
const [city, setCity] = useState("");

    return(
        <div>
            <nav className="flex justify-between items-center m-5">
                <div className="flex  items-center gap-3"><i class="fa-solid fa-arrow-left"></i>
                <p className="text-xl font-semibold">Cart</p></div>
                <div className={`flex gap-1 items-center px-2 py-1 rounded-md ${
  appliedOffer ? "bg-green-100 text-green-700" : "text-gray-700"
}`}>
  <i className={`fa-solid ${appliedOffer ? "fa-circle-check" : "fa-tag"}`}></i>

  <p className="text-sm font-semibold">
    {appliedOffer ? "Offer Applied" : "Offers"}
  </p>
</div>
            </nav>

        <div className="bg-[#EEEEF1] px-40 py-5 ">
            <div className="bg-white p-3 flex gap-5 items-center rounded-lg mb-5">
             <div onClick={() => setShowDeliveryPopup(true)}
                className="bg-[#FFFFFF] p-2 border border-gray-100 rounded-lg flex gap-1 items-center cursor-pointer">
             <div><p className="text-gray-500 text-xs font-semibold">DELIVER</p>
             <p className="text-black font-bold text-lg">{deliveryType}</p></div>
             <div><i class="fa-solid fa-angle-down text-gray-500 text-xs"></i></div></div>

             <div>
             <div className="flex items-center gap-1"><p className="text-xs font-bold">Home</p><i class="fa-solid fa-angle-down text-gray-500 text-xs"></i></div>
             <div><p className="text-gray-500 text-xs max-w-[220px] truncate">
  {address || "Add Address"}
</p>
</div>
             </div>
            </div>

    <div className="flex gap-10">

        <div className="bg-white p-3 rounded-lg w-[60%]">
    {cartItems.map((item) => (
        <div key={item._id} className="flex justify-between border-b border-dashed pb-5 mb-5">
        <div>
        <p className="font-semibold"> {item.name}</p>
        <p className="text-sm text-gray-500"> Regular | New Hand Tossed</p>
        <div className="flex items-center mt-1 gap-1">
        <p className="text-xs text-gray-500 border-b border-gray-500 border-dashed font-bold"> Customize</p>
        <i className="fa-solid fa-angle-right text-xs text-gray-500"></i>
        </div></div>

        <div className="flex items-center gap-5">
        <div className="flex items-center gap-4 bg-[#FFFFFF] p-1 border border-gray-200 rounded-lg">
        <button onClick={() => decreaseQuantity(item._id)}>-</button>
        <p> {item.quantity} </p>
        <button onClick={() => increaseQuantity(item._id)}> +</button>
        </div>
        <div>₹ {item.price * item.quantity}</div>
        </div>
        </div>))}

        <div className="flex items-center gap-2 pt-3">
            <button onClick={() => navigate("/menu")} className="text-gray-500"> +</button>
            <p className="text-gray-500 text-sm font-semibold">Add more items</p>
        </div>
        </div>

        <div>
        <div className="bg-white p-5 rounded-lg">
        <p className="text-green-700 font-semibold"> You saved ₹{totalSavings} with FREE Delivery 🎉</p>

        <div className="p-3">
            {!appliedOffer ? (<div className="flex justify-between items-center border border-dashed rounded-md p-3">
            <div className="flex gap-2"><img src={Offer} alt="Offer"></img>
            <div>
                <p className="text-sm font-semibold text-gray-700">Save up to ₹30 with this offer</p>
                <p className="text-xs text-gray-500">GET30</p>
            </div></div>

            <button onClick={() => setAppliedOffer("GET30")} className="text-xs text-red-600 font-semibold rounded-md px-2 py-1 border border-red-600">
            Apply</button>
            </div>) : 
            (<div>
            <ul className="text-xs text-gray-500 pb-2 list-disc pl-4"> 
            {deliverySaved > 0 && <li>₹45 - FREE Delivery</li>} {discount > 0 && <li>₹30 - Coupon GET30</li>}</ul>
            <div className="flex justify-between">
            <div className="text-gray-500 flex gap-1">
                <i className="fa-solid fa-check"></i>
                <p className="text-xs font-semibold">GET30 Applied</p></div>
                <button onClick={() => setAppliedOffer("")} className="text-xs text-gray-500 font-semibold border-b border-gray-500">
                Remove</button></div>
            </div>)}
        </div>

        <div onClick={() => navigate("/offers")} className="flex items-center justify-center pt-4 gap-1 cursor-pointer border-t border-dashed">
            <p className="text-gray-500 text-xs font-semibold"> View Other Offers</p>
            <i className="fa-solid fa-angle-right text-xs text-gray-500"></i>
        </div>
        </div>

        <div className="bg-white p-5 rounded-lg mt-5">
        <div className="flex justify-between pb-2">
            <p className="text-xs text-gray-500">Item(s) Total</p>
            <p className="text-xs">₹{subtotal}</p></div>

        {discount > 0 && (<div>
        <div className="flex justify-between pb-2 cursor-pointer" onClick={() => setShowDiscount(!showDiscount)}>
            <div className="flex gap-1 items-center">
            <p className="text-xs text-gray-500">Discount Applied</p>
            <i className={`fa-solid ${showDiscount ? "fa-angle-up" : "fa-angle-down"} text-xs text-gray-500`}></i>
            </div>
            <p className="text-xs text-green-700">-₹{discount}</p>
        </div>

        {showDiscount && (<div className="text-xs text-gray-500 pl-3 pb-2 space-y-1">
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-green-600"></i>
            <p>Coupon GET30 - ₹{discount}</p>
          </div>
        </div>)}
        </div>)}


        <div className="flex justify-between pb-2">
            <p className="text-xs text-gray-500">Delivery Charges</p>
            <p className="text-xs text-green-700">{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</p>
        </div>

        <div>
        <div className="flex justify-between pb-3 border-b border-gray-100 cursor-pointer" onClick={() => setShowTaxes(!showTaxes)}>
        <div className="flex gap-1 items-center">
            <p className="text-xs text-gray-500">Taxes & Charges</p>
            <i className={`fa-solid ${showTaxes ? "fa-angle-up" : "fa-angle-down"} text-xs text-gray-500`}></i>
            </div>
            <p className="text-xs text-gray-500">₹{totalTaxAndCharges.toFixed(2)}</p>
        </div>

        {showTaxes && (<div className="text-xs text-gray-500 pl-3 pb-2 space-y-1">
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

        <div className="flex justify-between py-2">
            <p className="text-xs">Total</p>
            <p className="text-xs">₹{finalTotal.toFixed(2)}</p>
        </div>

        <div className="border border-gray-100 px-5 py-2 rounded-md flex gap-2 items-center">
            <img src={Delivery} alt="image" className="w-6"></img>
            {totalSavings > 0 && (
            <p className="text-sm">₹{totalSavings} saved with FREE Delivery on your order</p>)}
        </div>
        </div>

        </div>
    </div>      
    </div>

        <div className="flex items-center gap-2 px-5 py-1 border border-gray-200">
            <div><img src={Offer} alt="Offer"></img></div>
            <div>
                <p className="text-xs">WOOHOO</p>
                
                <p className="text-xs">You saved <span className="font-bold">₹{totalSavings}</span> (Including FREE Delivery) 🎉</p>
            </div>
        </div>

        <div className="p-5">
        <div onClick={handleCheckout} className="flex justify-center items-center bg-[#E31837] py-2 rounded-md gap-1 cursor-pointer">
            <p className="text-white text-sm font-bold">Pay ₹{finalTotal.toFixed(2)}</p>
            <i class="fa-solid fa-angle-right text-xs text-white"></i></div>
        </div>

{showAddress && (
  <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
    <div className="bg-white w-[95%] md:w-[500px] rounded-2xl p-6 relative">

      {/* Close button */}
      <button
        onClick={() => setShowAddress(false)}
        className="absolute top-4 right-4"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <h1 className="text-2xl font-bold mb-5">Delivery Address</h1>

      {/* FULL FORM */}
      <div className="space-y-4">

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Flat / House No"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Street / Area"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="Landmark"
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
        />

        {/* SAVE BUTTON */}
        <button
          onClick={() => {
            if (!house || !street || !city) return;

            const fullAddress =
              `${house}, ${street}, ${landmark}, ${city}`;

            saveAddress(fullAddress);
            setShowAddress(false);
          }}
          className="w-full bg-[#E31837] text-white py-3 rounded-lg font-semibold"
        >
          Save Address
        </button>

      </div>
    </div>
  </div>
)}


    {showDeliveryPopup && (
    <div className="fixed inset-0 bg-black/40 flex items-end justify-center z-50">
    <div className="bg-white w-full rounded-t-3xl p-5">
    <div className="flex justify-between items-center mb-5">
        <h1 className="text-lg font-bold">Select Delivery Time</h1>
        <button onClick={() => setShowDeliveryPopup(false)}>
        <i className="fa-solid fa-xmark text-xl"></i>
        </button>
    </div>

    <div className="flex gap-3 mb-5">
      <button onClick={() => setDeliveryType("Now")} className={`px-5 py-2 rounded-full border font-semibold
        ${ deliveryType === "Now" ? "bg-[#E31837] text-white border-[#E31837]" : "border-gray-300"}`}>
        Now</button>
      <button onClick={() => setDeliveryType("Later")} className={`px-5 py-2 rounded-full border font-semibold
        ${ deliveryType === "Later" ? "bg-[#E31837] text-white border-[#E31837]" : "border-gray-300"}`}>
        Later
      </button>
    </div>

    {deliveryType === "Later" && (
    <div>
    <p className="font-semibold mb-3">Select Date</p>
    <div className="flex gap-3 overflow-x-auto pb-3">

    {["Today", "Tomorrow", "Jun 1", "Jun 2", "Jun 3", "Jun 4", "Jun 5", "Jun 6", "Jun 7", "Jun 8",].map((date, index) => (
        <button key={index} onClick={() => setSelectedDate(date)} className={`px-4 py-2 rounded-lg border whitespace-nowrap
        ${ selectedDate === date ? "bg-[#E31837] text-white border-[#E31837]" : "border-gray-300"}`}>
        {date}</button>
        ))}</div>

    <p className="font-semibold mb-3 mt-5">Select Time</p>
    <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}
       className="border border-gray-300 rounded-lg px-4 py-2 w-full"/>
    </div>)}

    <button onClick={() => setShowDeliveryPopup(false)} className="bg-[#E31837] text-white w-full py-3 rounded-xl font-semibold mt-6">
      Save</button>
    </div>
    </div>)}
    </div>

)
}

export default Cart