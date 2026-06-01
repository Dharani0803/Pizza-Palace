import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return;

  const user = JSON.parse(storedUser);

  fetch(`https://pizza-palace-3.onrender.com/api/orders?email=${user.email}`)
    .then((res) => res.json())
    .then((data) => setOrders(data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="bg-[#EEEEF1] min-h-screen">

      <nav className="bg-white px-5 py-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <p className="text-xl font-semibold">My Orders</p>
      </nav>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <i className="fa-solid fa-bag-shopping text-6xl text-gray-300 mb-5"></i>

          <p className="text-xl font-bold text-gray-700">
            No Orders Placed
          </p>
        </div>
      ) : (
        <div className="p-5 space-y-5">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-5 shadow-sm">

              <div className="flex justify-between items-start border-b border-dashed pb-4">

                <div>
                  <p className="font-bold text-lg">
                    {order._id}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                  {order.status}
                </div>

              </div>

              <div className="py-4 space-y-2">
                {Array.isArray(order.items) &&
  order.items.map((item, index) => (
                  <p key={index} className="text-sm text-gray-600">
                    • {item.name} x {item.quantity}
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center border-t border-dashed pt-4">
                <p className="font-bold">₹{order.totalAmount}</p>

                <button className="bg-[#E31837] text-white px-4 py-2 rounded-lg text-sm">
                  Reorder
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;