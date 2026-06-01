import { useState, useEffect } from "react";

function AdminOrders() {

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
        order._id === id ? { ...order, status: value } : order
      )
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-6">

      <div className="mb-6">

        <p className="text-3xl font-bold">
          Orders Management
        </p>

        <p className="text-gray-500 mt-1">
          Manage all customer orders
        </p>

      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

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

              <tr
                key={order._id}
                className="border-t"
              >

                <td className="p-4 font-semibold">
                  {order._id}
                </td>

                <td className="p-4">
                  {order.address || "Guest"}
                </td>

                <td className="p-4">
                  ₹{order.totalAmount}
                </td>

                <td className="p-4">

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order._id,
                        e.target.value
                      )
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                </td>

                <td className="p-4 text-sm space-y-1">
  {order.items?.map((item, index) => (
    <p key={index}>
      🍕 {item.name} × {item.quantity}
    </p>
  ))}
</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminOrders;