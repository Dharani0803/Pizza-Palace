import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  fetch("https://pizza-palace-3.onrender.com/api/orders")
    .then((res) => res.json())
    .then((data) => setOrders(data));
  }, []);

 const updateStatus = async (id, value) => {
  try {
    await fetch(`https://pizza-palace-3.onrender.com/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value }),
    });
    setOrders((prev) =>
      prev.map((order) =>
        order._id === id ? { ...order, status: value } : order)
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-5">

      <div className="mb-6">
      <div className="flex gap-3">
        <div>
          <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left cursor-pointer pt-2"></i>
        </div>
        <div>
          <p className="text-2xl font-bold">Orders Management</p>
          <p className="text-gray-500 mt-1">Manage all customer orders</p>
      </div></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[800px]">

        <thead className="bg-white">
        <tr>
          <th className="text-left p-4">Order ID</th>
          <th className="text-left p-4">Customer</th>
          <th className="text-left p-4">Amount</th>
          <th className="text-left p-4">Status</th>
          <th className="text-left p-4">Items</th>
        </tr>
        </thead>

        <tbody>
        {orders.map((order) => (
        <tr key={order._id} className="border-t">
          <td className="p-4 font-semibold">{order._id}</td>
          <td className="p-4">{order.customerName || "Guest"}</td>
          <td className="p-4">₹{order.totalAmount}</td>
          <td className="p-4">
            <select value={order.status} onChange={(e) => updateStatus( order._id, e.target.value)}
             className="border rounded-lg px-3 py-2">
              <option>Pending</option>
              <option>Preparing</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </td>
          <td className="p-4 text-sm space-y-1">{order.items?.map((item, index) => (
            <p key={index}>{item.name} × {item.quantity}</p>))}
          </td>
        </tr>))}
      </tbody>

    </table>
    </div></div>
  </div> );
}

export default AdminOrders;