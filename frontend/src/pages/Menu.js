import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Offer from "../assets/offer.svg"

function Menu(){
  const Categories = ["Chicken Feast","Cheese Lava","Big Big Pizza","Sourdough Range","Rice Bowls","5 Course Lunch Feast","Veg Pizza","Non-Veg Pizza","Pizza Mania","Chicken Maxxx","Garlic Breads & Dips","Cheese Burst Pizza","Crazy Deals","Cheese Volcano","Desserts","Beverages","Tacos & Parcels"]
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
  const { cartItems, addToCart, increaseQuantity, decreaseQuantity} = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [vegFilter, setVegFilter] = useState(false);
  const [nonVegFilter, setNonVegFilter] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const filteredPizzas = pizzas
  .filter((pizza) => {
    const categoryMatch =
      pizza.category === selectedCategory;
    const searchMatch =
      pizza.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const vegMatch =
      vegFilter ? pizza.isVeg : true;
    const nonVegMatch =
      nonVegFilter ? !pizza.isVeg : true;
    return (
      categoryMatch &&
      searchMatch &&
      vegMatch &&
      nonVegMatch
    );})

  .sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price;
    }
    if (sortOrder === "highToLow") {
      return b.price - a.price;
    }
    return 0;
  });

    console.log(pizzas);
    console.log(selectedCategory);
    console.log(filteredPizzas);

    useEffect(() => {
    fetch("https://pizza-palace-3.onrender.com/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.log(err));
    }, []);
    
  return(
    <div>
      <nav className="flex justify-between items-center m-3">
        <div className="flex items-center gap-5 cursor-pointer" onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i>
        <p className="text-xl font-semibold">Back to Home</p></div>
        <div><i onClick={() => setShowSearch(!showSearch)} className="fa-solid fa-magnifying-glass bg-[#FFFFFF] rounded-full border border-gray-400 p-2 cursor-pointer"></i>
        </div>
      </nav>

    {showSearch && (
    <div className="px-3 mt-4">
      <input type="text" placeholder="Search pizzas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none"/>
    </div>)}

    <div className="flex ml-3 mt-5 gap-2">
    <button onClick={() => {setVegFilter(!vegFilter); setNonVegFilter(false);}}
      className={`flex items-center gap-1 border p-1.5 text-sm rounded-md
      ${vegFilter ? "bg-green-600 text-white border-green-600" : "border-gray-300 text-gray-800 bg-white"}`}>
      <div className="bg-white p-[1px] rounded-sm">
      <div className="w-[14px] h-[14px] border border-green-600 rounded-[2px] flex items-center justify-center">
      <div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>
      </div></div>Veg Only</button>

    <button onClick={() => {setNonVegFilter(!nonVegFilter); setVegFilter(false);}}
      className={`flex items-center gap-1 border p-1.5 text-sm rounded-md
      ${nonVegFilter ? "bg-red-600 text-white border-red-600" : "border-gray-300 text-gray-800 bg-white"}`}>
      <div className="bg-white p-[1px] rounded-sm">
      <div className="w-[14px] h-[14px] border border-[#8B4513] rounded-[2px] flex items-center justify-center">
      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]"></div>
      </div></div>Non Veg Only</button>

    <select
  value={sortOrder}
  onChange={(e) => setSortOrder(e.target.value)}
  className="border border-gray-300 px-2 py-1 text-sm rounded-md outline-none bg-white w-20"
>
  <option value="">Sort By</option>
  <option value="lowToHigh">Price: Low to High</option>
  <option value="highToLow">Price: High to Low</option>
</select>
    </div>          
            

    <div className="flex mt-5 overflow-x-auto  whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
    {Categories.map((category, index) => (
    <button key={index} className={`flex-shrink-0 text-center px-5 py-3 text-sm font-semibold text-gray-700 border border-gray-300 ${
    selectedCategory === category ? "bg-red-600 text-white" : "bg-gray-200 text-black"}`} onClick={() => setSelectedCategory(category)}>
    {category}</button>))}</div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 py-4">
  {filteredPizzas.map((pizza, index) => {

  const cartItem = cartItems.find(
    (item) => item._id === pizza._id
  );

  return (

      
    <div key={index} className="relative rounded-md shadow-md overflow-hidden flex-shrink-0">
      <img src={pizza.imageUrl} alt={pizza.name} className="w-full h-80 object-cover"/>

      <div className="absolute bottom-0 text-white w-full">
      <div className="px-3 py-2">

      <div className="flex items-center gap-2">
      <div className="bg-white p-[1px] rounded-sm">
      <div className={`w-[14px] h-[14px] border rounded-[2px] flex items-center justify-center
        ${ pizza.isVeg ? "border-green-600" : "border-[#8B4513]"}`}>
        {pizza.isVeg ? (<div className="w-[7px] h-[7px] bg-green-600 rounded-full"></div>) : (
        <div className="w-0 h-0 border-l-[4px] border-l-transparen border-r-[4px] border-r-transparent border-b-[7px] border-b-[#8B4513]">
        </div>)}</div></div>
      <h1 className="text-lg font-bold">{pizza.name}</h1></div>

      <p className="text-xs text-gray-200 line-clamp-2">{pizza.description}</p></div>
      <div className="flex items-center p-3 justify-between border-t inset-0 bg-black/30 backdrop-blur-md">
      <div className="flex-col">
      <span className="text-xl font-bold">₹{pizza.price}</span>
      <p className="text-xs font-bold border-b pb-1 border-dashed">Regular | New Hand Tossed <i class="fa-solid fa-angle-right"></i></p></div>
      {
  cartItem ? (

    <div className="flex items-center gap-4 bg-transparent border border-gray-200 text-white px-4 py-2 rounded-md">

      <button
        onClick={() => decreaseQuantity(pizza._id)}
      >
        -
      </button>

      <span>
        {cartItem.quantity}
      </span>

      <button
        onClick={() => increaseQuantity(pizza._id)}
      >
        +
      </button>

    </div>

  ) : (

    <button
      onClick={() => addToCart(pizza)}
      className="bg-[#E31837] px-5 py-2 rounded-md font-semibold text-white"
    >
      Add +
    </button>

  )
}

      </div></div>
    </div>)})}</div>

  
    {cartItems.length > 0 && (
   
    <div className="fixed bottom-0 left-0 w-full cursor-pointer z-50 bg-white">
      <div className="flex px-5 py-1 border border-gray-200">
      <div className="flex items-center gap-2 ">
        <div><img src={Offer} alt="Offer"></img></div>
        <div><p className="text-xs">Offer Applied! Add items and proceed to your cart</p>
        <p className="text-xs font-bold">Cart total : <span className="font-bold">₹{
        cartItems.reduce( (total, item) => total + item.price * item.quantity, 0)}
        </span> + Taxes</p></div></div>
        
      </div>

      <div className="p-3">
      <div onClick={() => navigate("/cart")} className="bg-[#E31837] rounded-md text-white px-6 py-2 flex justify-between items-center">
      <p className="font-semibold text-xs"> {cartItems.length} Items Added</p>
      <div className="flex items-center gap-3">
      <div className="relative">

      <i className="fa-solid fa-cart-shopping text-lg"></i>
      {cartItems.length > 0 && (
        <div className="absolute -top-2 left-5 -translate-x-1/2 bg-black/80 border text-white text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center">
          {cartItems.length}
        </div>)}</div>

      <p className="text-sm font-semibold"> View Cart</p>
      <i class="fa-solid fa-angle-right"></i></div>
    </div></div></div>)}
    
  </div>
)}

export default Menu