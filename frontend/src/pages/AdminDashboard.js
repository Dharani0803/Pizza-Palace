import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showQuickAccess, setShowQuickAccess] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("https://pizza-palace-3.onrender.com/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.status !== "Delivered"
  );

  const revenueOrders = orders.filter(
    (order) => order.status === "Delivered"
  );

  const totalRevenue = revenueOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div className="bg-[#F4F4F6] min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
      <div className="flex gap-3">

        <div><i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left cursor-pointer pt-2"></i></div>
        <div>
          <p className="text-2xl font-bold">Admin Dashboard</p>
          <p className="text-gray-500">Orders, Revenue & Delivery Tracking</p>
        </div>
      </div>

      <div className="relative">
      <button onClick={() => setShowQuickAccess(!showQuickAccess)}
        className="bg-[#E31837] text-white px-4 py-2 rounded-md font-semibold">
        Quick Access</button>

      {showQuickAccess && (
      <div className="absolute right-0 mt-3 bg-white shadow-xl rounded-xl w-52 z-50 border">
        <button onClick={() => navigate("/admin/pizzas")} className="w-full text-left px-4 py-3 hover:bg-gray-100">
          Manage Pizzas</button>
        <button onClick={() => navigate("/admin/orders")} className="w-full text-left px-4 py-3 hover:bg-gray-100">
          Manage Orders</button>
      </div>)}
      </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
      <h2 className="font-bold mb-4">Total Orders ({orders.length})</h2>

      {orders.length === 0 ? (<p className="text-gray-500">No orders yet</p>) : (
      <div className="space-y-3 max-h-[300px] overflow-y-auto">

      {orders.map((order) => (
      <div key={order._id} className="border p-3 rounded-lg flex justify-between items-center">
        <div>
          <p className="font-semibold">Order #{order._id.slice(-5)}</p>
          <p className="text-sm text-gray-500">₹{order.totalAmount}</p>
        </div>

        <span className={`text-xs p-3 rounded-md font-semibold
          ${ order.status === "Delivered"
             ? "bg-green-100 text-green-700"
             : "bg-yellow-100 text-yellow-700" }`}>
          {order.status}</span>

      </div>))}
      </div>)}
      </div>

     
    <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
    <h2 className="font-bold mb-4"> Pending Orders ({pendingOrders.length})</h2>

    {pendingOrders.length === 0 ? (<p className="text-gray-500">No pending orders 🎉</p>) : (
    <div className="space-y-3">

    {pendingOrders.map((order) => (
      <div key={order._id} className="border p-3 rounded-lg">
        <p className="font-semibold">Order #{order._id.slice(-5)}</p>
        <p className="text-sm text-gray-500">Status: {order.status}</p>
        <p className="text-sm text-gray-500">Amount: ₹{order.totalAmount}</p>
      </div>))}
    </div>)}
    </div>

      
    <div className="bg-white p-5 rounded-2xl shadow-sm">
    <h2 className="font-bold mb-4">Revenue (Delivered Orders)</h2>

    {revenueOrders.length === 0 ? (<p className="text-gray-500">No delivered orders yet</p>) : (
    <div className="space-y-3 max-h-[300px] overflow-y-auto">

    {revenueOrders.map((order) => (
      <div key={order._id} className="border p-3 rounded-lg flex justify-between items-center">
      <div>
        <p className="font-semibold">Order #{order._id.slice(-5)}</p>
        <p className="text-sm text-gray-500">Payment: {order.paymentMethod || "COD"}</p>
      </div>
        <p className="font-semibold">₹{order.totalAmount}</p>

      </div>))}
      </div>)}

      <div className="mt-4 px-4 border-t pt-3 flex justify-between">
        <p className="font-bold">Total Revenue</p>
        <p className="font-bold">₹{totalRevenue}</p>
      </div>

      </div>
  </div>);}

export default AdminDashboard;