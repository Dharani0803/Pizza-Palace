import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import Offers from "./pages/Offers";

import AdminDashboard from "./pages/AdminDashboard";
import AdminPizzas from "./pages/AdminPizzas";
import AdminOrders from "./pages/AdminOrders";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PizzaDetails from "./pages/PizzaDetails";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import Terms from "./pages/Terms";


function App() {
  const { toastMessage } = useContext(CartContext);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/pizza/:id" element={<PizzaDetails />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/pizzas" element={<AdminRoute><AdminPizzas /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />

      </Routes>
      
      {toastMessage && (
        <div className="fixed top-3 left-1/2 font-semibold -translate-x-1/2 bg-black/70 text-white px-4 py-3 rounded-md z-50 shadow-lg">
          {toastMessage}
        </div>
      )}

    </BrowserRouter>
  );
}

export default App;