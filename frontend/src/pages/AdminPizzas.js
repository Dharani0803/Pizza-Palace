import { useEffect, useState } from "react";

function AdminPizzas() {

  const [pizzas, setPizzas] = useState([]);

  const [newPizza, setNewPizza] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    isVeg: true
  });

  // FETCH PIZZAS
  useEffect(() => {
    fetch("https://pizza-palace-3.onrender.com/api/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data));
  }, []);

  // ADD PIZZA
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
      isVeg: true
    });
  };

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <p className="text-3xl font-bold">
            Pizza Management
          </p>

          <p className="text-gray-500 mt-1">
            Manage pizzas from database
          </p>
        </div>

      </div>

      {/* ADD PIZZA */}
      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">

        <p className="text-xl font-bold mb-4">
          Add New Pizza
        </p>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Pizza Name"
            value={newPizza.name}
            onChange={(e) =>
              setNewPizza({
                ...newPizza,
                name: e.target.value
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            placeholder="Price"
            type="number"
            value={newPizza.price}
            onChange={(e) =>
              setNewPizza({
                ...newPizza,
                price: e.target.value
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            placeholder="Category"
            value={newPizza.category}
            onChange={(e) =>
              setNewPizza({
                ...newPizza,
                category: e.target.value
              })
            }
            className="border rounded-lg px-4 py-3"
          />

          <input
            placeholder="Image URL"
            value={newPizza.imageUrl}
            onChange={(e) =>
              setNewPizza({
                ...newPizza,
                imageUrl: e.target.value
              })
            }
            className="border rounded-lg px-4 py-3"
          />

        </div>

        <textarea
          placeholder="Description"
          value={newPizza.description}
          onChange={(e) =>
            setNewPizza({
              ...newPizza,
              description: e.target.value
            })
          }
          className="border rounded-lg px-4 py-3 w-full mt-4"
        ></textarea>

        <div className="flex items-center gap-3 mt-4">

          <input
            type="checkbox"
            checked={newPizza.isVeg}
            onChange={(e) =>
              setNewPizza({
                ...newPizza,
                isVeg: e.target.checked
              })
            }
          />

          <p>Veg Pizza</p>

        </div>

        <button
          onClick={addPizza}
          className="bg-[#E31837] text-white px-5 py-3 rounded-xl font-semibold mt-5"
        >
          Add Pizza
        </button>

      </div>

    </div>
  );
}

export default AdminPizzas;