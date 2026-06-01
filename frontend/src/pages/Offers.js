import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Offers() {
    const navigate = useNavigate();
  const { appliedOffer, setAppliedOffer } = useContext(CartContext);

  const toggleOffer = (code) => {
    setAppliedOffer(appliedOffer === code ? "" : code);
  };

  return (
    <div className="m-5">
      <div className="flex gap-3"><button onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      <h1 className="text-xl font-bold">Deals & Offers</h1></div>

      <div className="mt-5 flex flex-col gap-5">

        {/* GET30 OFFER */}
        <div className="flex justify-between items-center rounded-lg text-white p-4 bg-gradient-to-b from-[#0254B1] to-[#1879D2]">

          <div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-tags"></i>
              <p className="text-sm font-bold">Get ₹30 OFF</p>
            </div>
            <p className="text-sm">
              Upto ₹30 Off on orders of ₹199 or more
            </p>
          </div>

          <button
            onClick={() => toggleOffer("GET30")}
            className={`text-sm border px-3 py-1 rounded-md font-semibold ${
              appliedOffer === "GET30"
                ? "bg-white text-[#0254B1]"
                : "text-white"
            }`}
          >
            {appliedOffer === "GET30" ? "Applied" : "Apply"}
          </button>
        </div>

        {/* FREE DELIVERY OFFER */}
        <div className="flex justify-between items-center rounded-lg text-white p-4 bg-gradient-to-b from-orange-700 to-orange-500">

          <div>
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-truck-fast"></i>
              <p className="text-sm font-bold">FREE Delivery</p>
            </div>
            <p className="text-sm">
              No delivery fee on your order today
            </p>
          </div>

          <button
            onClick={() => toggleOffer("FREEDEL")}
            className={`text-sm border px-3 py-1 rounded-md font-semibold ${
              appliedOffer === "FREEDEL"
                ? "bg-white text-orange-600"
                : "text-white"
            }`}
          >
            {appliedOffer === "FREEDEL" ? "Applied" : "Apply"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Offers;