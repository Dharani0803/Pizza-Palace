import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPizzas() {

  const navigate = useNavigate();
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isVeg: true,
    hasSize: true,
    hasCrust: true
  });

  useEffect(() => {
    fetch("https://pizza-palace-3.onrender.com/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  const addPizza = async () => {
    const response = await fetch(
      "https://pizza-palace-3.onrender.com/api/pizzas",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPizza)
      }
    );
    const data = await response.json();
    setPizzas([...pizzas, data]);
    setNewPizza({
      name: "",
      description: "",
      price: "",
      category: "",
      imageUrl: "",
      isVeg: true,
      hasSize: true,
      hasCrust: true
    });
  };

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-6">

      <div className="flex justify-between items-center mb-6">
      <div className="flex gap-3">
        <div>
          <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left cursor-pointer"></i>
        </div>

        <div>
          <p className="text-2xl font-bold">Pizza Management</p>
          <p className="text-gray-500 mt-1">Manage pizzas from database</p>
        </div>
      </div></div>

      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
        <p className="text-xl font-bold mb-4">Add New Pizza</p>

        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Pizza Name" value={newPizza.name} className="border rounded-lg px-4 py-3"
            onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value})}
          />
          <input placeholder="Price" type="number" value={newPizza.price} className="border rounded-lg px-4 py-3"
            onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })}
          />
          <input placeholder="Category" value={newPizza.category} className="border rounded-lg px-4 py-3"
            onChange={(e) => setNewPizza({ ...newPizza, category: e.target.value })}
          />
          <input placeholder="Image URL" value={newPizza.imageUrl} className="border rounded-lg px-4 py-3"
           onChange={(e) => setNewPizza({ ...newPizza, imageUrl: e.target.value })}
          />
        </div>

        <textarea placeholder="Description" value={newPizza.description}
          onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
          className="border rounded-lg px-4 py-3 w-full mt-4"
        ></textarea>

        <div className="flex">
        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" checked={newPizza.isVeg}
            onChange={(e) => setNewPizza({ ...newPizza, isVeg: e.target.checked })}
          />
          <p>Veg Pizza</p>

        </div>

        <div className="flex items-center gap-3 mt-2">
  <input
    type="checkbox"
    checked={newPizza.hasSize}
    onChange={(e) =>
      setNewPizza({ ...newPizza, hasSize: e.target.checked })
    }
  />
  <p>Has Size </p>
</div>

<div className="flex items-center gap-3 mt-2">
  <input
    type="checkbox"
    checked={newPizza.hasCrust}
    onChange={(e) =>
      setNewPizza({ ...newPizza, hasCrust: e.target.checked })
    }
  />
  <p>Has Crust </p>
</div></div>

        <button onClick={addPizza} className="bg-[#E31837] text-white px-5 py-3 rounded-xl font-semibold mt-5">
          Add Pizza</button>
      </div>
    </div>);
  }

export default AdminPizzas;