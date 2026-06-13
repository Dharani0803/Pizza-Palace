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

  const deletePizza = async (id) => {
  try {
    await fetch(
      `https://pizza-palace-3.onrender.com/api/pizzas/${id}`,
      {
        method: "DELETE",
      }
    );

    setPizzas((prev) =>
      prev.filter((pizza) => pizza._id !== id)
    );
  } catch (err) {
    console.log(err);
  }
};

const updatePizza = async (id) => {
  try {
    const response = await fetch(
      `https://pizza-palace-3.onrender.com/api/pizzas/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPizza),
      }
    );

    const updatedPizza = await response.json();

    setPizzas((prev) =>
      prev.map((pizza) =>
        pizza._id === id ? updatedPizza : pizza
      )
    );
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
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-5">

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

        <div className="flex gap-5">
        <div className="flex items-center gap-3 mt-4">
          <input type="checkbox" checked={newPizza.isVeg}
            onChange={(e) => setNewPizza({ ...newPizza, isVeg: e.target.checked })}
          />
          <p>Veg Pizza</p>

        </div>

        <div className="flex items-center gap-3 mt-4">
  <input
    type="checkbox"
    checked={newPizza.hasSize}
    onChange={(e) =>
      setNewPizza({ ...newPizza, hasSize: e.target.checked })
    }
  />
  <p>Has Size </p>
</div>

<div className="flex items-center gap-3 mt-4">
  <input
    type="checkbox"
    checked={newPizza.hasCrust}
    onChange={(e) =>
      setNewPizza({ ...newPizza, hasCrust: e.target.checked })
    }
  />
  <p>Has Crust </p>
</div></div>

        <button
  onClick={() =>
    newPizza._id
      ? updatePizza(newPizza._id)
      : addPizza()
  }
  className="bg-[#E31837] text-white px-5 py-3 rounded-xl font-semibold mt-5"
>
  {newPizza._id ? "Update Pizza" : "Add Pizza"}
</button>
      </div>

      <div className="space-y-4">
  {pizzas.map((pizza) => (
    <div
      key={pizza._id}
      className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
    >
      <div>
        <p className="font-bold">{pizza.name}</p>
        <p>₹{pizza.price}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setNewPizza(pizza);
          }}
          className="bg-blue-500 text-white px-3 py-2 rounded" 
        >
          Edit
        </button>

        <button
          onClick={() => deletePizza(pizza._id)}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>);
  }

export default AdminPizzas;