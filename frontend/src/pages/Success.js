function Success() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">

      <i className="fa-solid fa-circle-check text-green-600 text-7xl mb-5"></i>

      <h1 className="text-3xl font-bold mb-3">
        Payment Successful
      </h1>

      <p className="text-gray-500 mb-5">
        Your pizza order has been placed 🍕
      </p>

      <button
        onClick={() => window.location.href = "/"}
        className="bg-[#E31837] text-white px-6 py-3 rounded-md"
      >
        Back To Home
      </button>

    </div>
  );
}

export default Success;