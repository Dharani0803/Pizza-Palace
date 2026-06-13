import { useEffect, useState } from "react";
import Logo from "../assets/logo.png"
import Banner from "../assets/BannerPizza.jpeg"
import Top from "../assets/top.png"
import Cheese from "../assets/volcano.png"
import Lunch from "../assets/lunchfeast.png"
import Offer from "../assets/offer.svg"
import "../index.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import PizzaSkeleton from "../components/Pizzaskeleton";
import { motion } from "framer-motion";

const items = [{ img: "c1.png", name: "Chicken Burst" }, { img: "c2.png", name: "Cheese Lava" }, { img: "c3.png", name: "Big Big Pizza" }, { img: "c4.png", name: "Sourdough Range" }, { img: "c5.png", name: "Rice Bowls" }, { img: "c6.png", name: "Veg Pizza" }, { img: "c7.png", name: "Non-Veg Pizza" }, { img: "c8.png", name: "Value Combos" }, { img: "c9.jpg", name: "Garlic Bread & Dips" }, { img: "c10.jpg", name: "Cheese Burst Pizza" }, { img: "c11.png", name: "Crazy Deals" }, { img: "c12.jpg", name: "Cheese Volcano" }, { img: "c13.png", name: "Desserts" }];

function Home(){
  const { address, saveAddress, saveCustomerName } = useContext(CartContext);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const { user } = useContext(UserContext);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  setLoading(true);

  setTimeout(() => {
    fetch("https://pizza-palace-3.onrender.com/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, 3000);

}, []);

  const bestSellerNames = ["Margherita","Peppy Paneer","Indi Tandoori Paneer","Veggie Paradise","Pepper Barbecue Chicken","Classic","Golden Corn","Garlic Breadsticks","Veg Parcel","Cheese Volcano BBQ Chicken"];
  const bestsellers = pizzas.filter((pizza) =>bestSellerNames.includes(pizza.name));
  const cheeseVolcanoNames = ["Cheese Volcano Veg Paradise","Cheese Volcano BBQ Chicken","Cheese Volcano Farmhouse","Cheese Volcano Peppy Paneer","Cheese Volcano Chicken Delight","Cheese Volcano Double Chicken","Corn & Cheese Volcano","Cheese Volcano Blazing Chicken"];
  const CheeseVolcano = pizzas.filter((pizza) =>cheeseVolcanoNames.includes(pizza.name));
  const lunchFeastNames = ["Farmhouse","Peppy Paneer","Margherita","Veggie Paradise","Indi Tandoori Paneer","Veg Extravaganza","Corn n Cheese Paratha Pizza","Cheese n Corn","Mexican Green Wave","Double Cheese Margherita"];
  const LunchFeast = pizzas.filter((pizza) =>lunchFeastNames.includes(pizza.name));
  const navigate = useNavigate();

  const [showAddress, setShowAddress] =useState(false);
  const [showProfile, setShowProfile] =useState(false);
  
  const { cartItems, showToast, addToCart, increaseQuantity, decreaseQuantity, appliedOffer, setAppliedOffer } = useContext(CartContext);
  const handleAddToCart = (item) => {
  addToCart({
    ...item,
    size: item.hasSize ? "Regular" : "NA",
    crust: item.hasCrust ? "New Hand Tossed" : "NA",
  });

  showToast("Your item is added to the cart 🍕");
};

  if (loading) {
  return <PizzaSkeleton />;
  }

  return(
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <nav className="flex justify-between items-center mt-2 mb-2">
      <div>
        <img className="w-16 md:ml-7 ml-3" src={Logo} alt="Logo"/>
      </div>
      < div className="flex md:gap-10  gap-5 items-center">
      <div onClick={() => setShowAddress(true)} className="flex md:gap-2 gap-1 items-center cursor-pointer">
        <i className="fa-solid fa-location-dot text-red-700"></i>
        <p className="max-w-[180px] truncate">{address || "No Location"}</p>
        <i className="fa-solid fa-angle-down"></i>
      </div>

    <div className="relative">
      <i onClick={() => setShowProfile(!showProfile)} className="fa-solid fa-circle-user text-gray-200 text-3xl md:mr-5 mr-3 cursor-pointer"></i>
      {showProfile && (<div>
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setShowProfile(false)}></div>
        <div className="fixed top-0 left-0 h-full w-[320px] bg-white shadow-2xl z-50 overflow-y-auto">

      <div className="bg-[#EAF4FF] px-4 py-4 flex items-center gap-3">
        <i className="fa-solid fa-circle-user text-4xl text-blue-500"></i>
        <div>
          <p className="font-semibold text-sm">{user?.name}</p>
          <p className="text-xs text-gray-600">{user?.email}</p>
        </div>
      </div>

      <button onClick={() => navigate("/profile")} className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Edit Profile</button>
      <button onClick={() => navigate("/offers")} className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Deals & Offers</button>
      <button onClick={() => navigate("/orders")} className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Order History</button>
      <button onClick={() => navigate("/terms")} className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Terms & Conditions</button>
      {user?.role === "admin" && (
      <button onClick={() => navigate("/admin")} className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Admin Dashboard</button>)}
      <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/login";}}
        className="w-full text-left px-4 py-4 hover:bg-gray-100 text-sm">
        Logout</button>

    </div></div>)}
    </div></div>
    </nav>

    {showAddress && (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
    <div className="bg-white w-[95%] md:w-[500px] rounded-2xl p-6 relative">

    <button onClick={() => setShowAddress(false)} className="absolute top-4 right-4">
      <i className="fa-solid fa-xmark text-xl"></i>
    </button>
    <h1 className="text-2xl font-bold mb-5">Delivery Address</h1>
    <form className="space-y-4">
      <input type="text" placeholder="Full Name"  value={fullName} onChange={(e) => setFullName(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <input type="text" placeholder="Mobile Number"value={mobile} onChange={(e) => setMobile(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <input type="text" placeholder="Flat / House No"  value={house} onChange={(e) => setHouse(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <input type="text" placeholder="Street / Area" value={street} onChange={(e) => setStreet(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <input type="text" placeholder="Landmark" value={landmark} onChange={(e) => setLandmark(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}
       className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"/>
      <button onClick={() => { const fullAddress = `${fullName}, ${house}, ${street}, ${landmark}, ${city}`;
        if (!fullName || !house || !street || !city) return;
        saveCustomerName(fullName);
        saveAddress(fullAddress);
        setShowAddress(false);}}
       className="w-full bg-[#E31837] text-white py-3 rounded-lg font-semibold">
      Save Address</button>
    </form>
    </div></div>)}

    <div>
      <img className="w-full h-full" src={Banner} alt="Banner"></img>
    </div>

    <div className="m-5">
      <h1 className="text-xl font-bold">Offers for you</h1>
    <div className="flex flex-col md:flex-row mt-3 md:gap-10 gap-3">
      <div className="flex gap-10">
        <div className="flex justify-between items-center rounded-lg text-white p-3 bg-gradient-to-b from-[#0254B1] to-[#1879D2]">
        <div><div className="flex items-center gap-2">
          <i className="fa-solid fa-tags"></i>
          <p className="text-sm font-bold">Get ₹30 OFF</p></div>
          <p className="text-sm">Upto ₹30 Off on orders of ₹199 or more</p></div>
          <button onClick={() => setAppliedOffer(appliedOffer === "GET30" ? "" : "GET30")}
           className={`text-sm border px-2 py-1 rounded-md font-semibold
           ${appliedOffer === "GET30" ? "bg-white text-[#0254B1]" : "text-white"}`}>
           {appliedOffer === "GET30" ? "Applied" : "Apply"}</button>
        </div>
      </div>

      <div className="flex gap-10">
      <div className="flex justify-between items-center rounded-lg text-white p-3 bg-gradient-to-b from-orange-700 to-orange-500">
        <div><div className="flex items-center gap-2"><i className="fa-solid fa-truck-fast"></i>
          <p className="text-sm font-bold">FREE Delivery</p></div>
          <p className="text-sm">No delivery fee on your order today</p></div>
          <button onClick={() => setAppliedOffer(appliedOffer === "FREEDEL" ? "" : "FREEDEL")}
           className={`text-sm border px-2 py-1 rounded-md font-semibold
           ${appliedOffer === "FREEDEL" ? "bg-white text-[#0254B1]" : "text-white"}`}>
           {appliedOffer === "FREEDEL" ? "Applied" : "Apply"}</button></div>
      </div>
    </div>
    </div>


    <div className="m-5">
      <h1 className="text-xl font-bold">What are you craving for?</h1>
    <div className="flex mt-5 gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
    {items.map((item, index) => (
      <div key={index} className="flex-shrink-0 text-center" onClick={() => navigate("/menu")}>
        <img src={`/images/${item.img}`} alt={item.name} className="w-24 object-cover"/>
        <p className="mt-2 text-gray-700 font-semibold text-xs"> {item.name} </p>
      </div>
    ))}</div></div>

 {/* Top BestSellers */}
  <hr className="h-2 bg-gray-100 border-none mt-14" />

  <div className="py-5 bg-gradient-to-t from-white via-orange-200 to-white">
    <div className="flex flex-col items-center">
      <img className="w-44" src={Top} alt="BestSellers"></img>
      <p className="text-[#B4831E] mt-1 font-semibold text-2xl">Top 10 BestSellers</p>
    </div>
    <div className="flex mt-3 mb-7 py-1.5 justify-center items-center gap-2 bg-gradient-to-r from-transparent via-[#FFE6B7] to-transparent">
      <i class="fa-solid fa-location-dot text-[#7F5300]"></i>
      <p className="text-[#7F5300] text-sm">In Location</p>
    </div>

  <div className="flex px-5 gap-8 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
  {bestsellers.map((item, index) => {const cartItem = cartItems.find(
  (cart) => cart._id === item._id
);
  return (
    <div key={index}
     className="relative min-w-[340px] h-[350px] rounded-xl overflow-hidden flex-shrink-0">
      <img onClick={() => navigate(`/pizza/${item._id}`, {state: { pizza: item, from: "home"}})}  src={item.imageUrl} alt="" className="w-full h-full object-cover"/>

    <div className="absolute bottom-0 text-white w-full">

    <div className="px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="bg-white p-[1px] rounded-sm">
          <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center
            ${item.isVeg ? "border-green-600" : "border-[#8B4513]"}`}>
            {item.isVeg ? (
            <div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>) : (
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]">
            </div>)}
          </div>
        </div>
        <h1 className="text-lg font-bold">{item.name}</h1>
      </div>
      <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
      </div>

    <div className="flex items-center p-3 shadow-[0_-4px_10px_rgba(0,0,0,0.15)] justify-between border-t inset-0 bg-black/30 backdrop-blur-md">
      <div className="flex-col">
        <span className="text-xl font-bold">₹{item.price}</span>
        <p className="text-xs font-bold border-b pb-1 border-dashed" onClick={() =>
    navigate(`/pizza/${item._id}`, {
      state: { pizza: item, from: "home"}
    })
  }
>
        {cartItem?.size || "Regular"} | {cartItem?.crust || "New Hand Tossed"}
<i className="fa-solid fa-angle-right ml-1"></i></p>
      </div>

    {cartItem ? (
        <div className="flex items-center gap-4 bg-transparent border border-gray-200 text-white px-4 py-2 rounded-md">
          <button onClick={() =>
  decreaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> - </button>
          <span>{cartItem.quantity}</span>
          <button onClick={() =>
  increaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> + </button>
        </div>
    ) : (
        <button onClick={() => handleAddToCart(item)} className="bg-[#E31837] px-5 py-2 rounded-md font-semibold text-white">
          Add +</button>)}
    </div>
  </div>
  </div>)})}
  </div></div>

  {/*Cheese Volcano*/}
  <hr className="h-2 bg-gray-100 border-none mt-5" />

  <div className="flex flex-col items-center">
    <img className="w-44 mt-5" src={Cheese} alt="Cheese Volcano"></img>
    <p className="text-[#DD773F] font-semibold text-2xl">Cheese Volcano</p>
  </div>
  <div className="my-3 py-1.5 text-center bg-gradient-to-r from-transparent via-[#FFE6B7] to-transparent">
    <p className="text-[#7F5300] text-sm">Molten Cheese Indulgence</p>
  </div>

  <div className="px-4 py-6">
  <div className="flex gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

  {CheeseVolcano.map((item, index) => {const cartItem = cartItems.find(
  (cart) => cart._id === item._id
);

  return (
  <div key={index} className="relative min-w-[340px] h-[350px] rounded-xl overflow-hidden flex-shrink-0">
    <img onClick={() => navigate(`/pizza/${item._id}`, {state: { pizza: item, from: "home"}})} src={item.imageUrl} alt="" className="w-full h-full object-cover"/>

  <div className="absolute bottom-0 text-white w-full">
    <div className="px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="bg-white p-[1px] rounded-sm">
        <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center
        ${ item.isVeg ? "border-green-600" : "border-[#8B4513]"}`}>
        {item.isVeg ? (<div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>) : (
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]">
        </div>)}</div></div>
        <h1 className="text-lg font-bold">{item.name}</h1>
      </div>
        <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
    </div>

    <div className="flex items-center p-3 justify-between border border-t-1 inset-0 bg-black/30 backdrop-blur-md">
      <div className="flex-col">
        <span className="text-xl font-bold">₹{item.price}</span>
        <p className="text-xs font-bold border-b pb-1 border-dashed" onClick={() =>
    navigate(`/pizza/${item._id}`, {
      state: { pizza: item, from: "home"}
    })
  }>{cartItem?.size || "Regular"} | {cartItem?.crust || "New Hand Tossed"}<i class="fa-solid fa-angle-right"></i></p>
      </div>

    {cartItem ? (
    <div className="flex items-center gap-4 bg-transparent border border-gray-200 text-white px-4 py-2 rounded-md">
      <button onClick={() =>
  decreaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> - </button>
      <span>{cartItem.quantity}</span>
      <button onClick={() =>
  increaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> + </button>
    </div>) : (
    <button onClick={() => handleAddToCart(item)} className="bg-[#E31837] px-5 py-2 rounded-md font-semibold">
     Add +</button>)}
    </div>
    </div></div>)})}
    </div></div>


    {/* Lunch Feast */}
    <div className="flex gap-3 pl-2 mt-5 items-center">
      <div>
        <img className="w-16" src={Lunch} alt="Lunch Feast"></img>
      </div>
      <div>
        <p className="font-semibold text-2xl">Lunch Feast @ ₹149</p>
        <p className="text-gray-600">5 Course Meal With Pizza, Side, Dessert & More!</p></div>
    </div>

    <div className="py-6">
    <div className="flex px-4 gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

    {LunchFeast.map((item, index) => {const cartItem = cartItems.find(
  (cart) => cart._id === item._id
);

  return (
    <div key={index} className="relative min-w-[340px] h-[350px] rounded-xl overflow-hidden flex-shrink-0">
    <img onClick={() => navigate(`/pizza/${item._id}`, {state: { pizza: item, from: "home"}})} src={item.imageUrl} alt="Pizza" className="w-full h-full object-cover"/>

    <div className="absolute bottom-0 text-white w-full">

    <div className="px-3 py-2">
    <div className="flex items-center gap-2">
      <div className="bg-white p-[1px] rounded-sm">
      <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center
        ${ item.isVeg ? "border-green-600" : "border-[#8B4513]"}`}>
        {item.isVeg ? (<div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>) : (
        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]">
        </div>)}</div></div>
      <h1 className="text-lg font-bold">{item.name}</h1>
    </div>
      <p className="text-xs text-gray-200 line-clamp-2">{item.description}</p>
    </div>

    <div className="flex items-center p-3 justify-between border border-t-1 inset-0 bg-black/30 backdrop-blur-md">
    <div className="flex-col">
      <span className="text-xl font-bold">₹{item.price}</span>
      <p className="text-xs font-bold border-b pb-1 border-dashed" onClick={() =>
    navigate(`/pizza/${item._id}`, {
      state: { pizza: item, from: "home"}
    })
  }>{cartItem?.size || "Regular"} | {cartItem?.crust || "New Hand Tossed"} <i class="fa-solid fa-angle-right"></i></p>
    </div>

    {cartItem ? (
    <div className="flex items-center gap-4 bg-transparent border border-gray-200 text-white px-4 py-2 rounded-md">
      <button onClick={() =>
  decreaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> - </button>
      <span>{cartItem.quantity}</span>
      <button onClick={() =>
  increaseQuantity(
    item._id,
    item.hasSize ? "Regular" : "NA",
    item.hasCrust ? "New Hand Tossed" : "NA"
  )
}> + </button>
    </div> ) : (
  <button onClick={() => handleAddToCart(item)} className="bg-[#E31837] px-5 py-2 rounded-md font-semibold">
    Add +</button>)}
  </div></div>
  </div> )})}</div>
  </div>


  {/* Offer */}
  <div className=" bg-white sticky bottom-0">
  {appliedOffer && (<div className="bg-white">
    <div className="flex items-center gap-3 py-2 shadow-[0_-4px_10px_rgba(0,0,0,0.10)] px-5">
      <img src={Offer} alt="Offer" />
      <p className="text-sm font-medium">🎉Offer Applied! {appliedOffer} activated</p>
    </div>
  </div>)}

  {/* Bottom Section */}
  <div className="flex sticky bottom-0 z-10 justify-center md:gap-40 gap-20 py-1 shadow-[0_-4px_10px_rgba(0,0,0,0.10)]">
    <div onClick={() => navigate("/menu")} className="text-center">
      <i class="fa-solid fa-bars-staggered text-gray-800"></i>
      <p className="text-sm text-gray-800">Menu</p>
    </div>
    <div className="text-center" onClick={() => navigate("/offers")}>
      <i className="fa-solid fa-tags text-gray-800"></i>
      <p className="text-sm text-gray-800">Offers</p>
    </div>

  {cartItems.length > 0 && (<div onClick={() => navigate("/cart")}
    className="flex items-center gap-2 cursor-pointer bg-[#E31837] text-white rounded-lg px-3">
    <div className="relative">
      <i className="fa-solid fa-cart-shopping text-lg"></i>
      {cartItems.length > 0 && (
      <div className="absolute -top-2 left-5 -translate-x-1/2 bg-black/80 border text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
        {cartItems.length}
      </div>)}</div>
      <p className="text-sm font-semibold"> View Cart</p>
      <i class="fa-solid fa-angle-right"></i>
  </div>)}
  </div></div>

</motion.div>)}


 export default Home