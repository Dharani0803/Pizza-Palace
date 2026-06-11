import { useNavigate } from "react-router-dom";

function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F7]">

      {/* Header */}
      <nav className="flex items-center gap-3 px-5 py-4 bg-white shadow-sm sticky top-0">
        <i
          onClick={() => navigate(-1)}
          className="fa-solid fa-arrow-left cursor-pointer text-lg"
        ></i>
        <h1 className="text-xl font-semibold">Terms & Conditions</h1>
      </nav>

      {/* Content */}
      <div className="p-5 flex justify-center">
        <div className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-6 space-y-6">

          <p className="text-sm text-gray-600">
            Last updated: June 2026
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg font-bold mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm text-gray-600 leading-6">
              By accessing or using our Pizza Ordering App, you agree to be bound by
              these Terms & Conditions. If you do not agree, please do not use the service.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg font-bold mb-2">2. Ordering & Delivery</h2>
            <p className="text-sm text-gray-600 leading-6">
              All orders are subject to availability. Delivery times are estimated and may
              vary based on location, weather, and traffic conditions.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg font-bold mb-2">3. Pricing & Payments</h2>
            <p className="text-sm text-gray-600 leading-6">
              Prices are inclusive of applicable taxes unless stated otherwise.
              We accept online payments through secure payment gateways.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg font-bold mb-2">4. Cancellation Policy</h2>
            <p className="text-sm text-gray-600 leading-6">
              Orders can only be cancelled within a short time after placement.
              Once preparation begins, cancellation may not be possible.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg font-bold mb-2">5. Offers & Discounts</h2>
            <p className="text-sm text-gray-600 leading-6">
              Offers cannot be combined unless explicitly mentioned.
              The company reserves the right to modify or withdraw offers at any time.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-lg font-bold mb-2">6. User Information</h2>
            <p className="text-sm text-gray-600 leading-6">
              You are responsible for maintaining accurate account and delivery information.
              Incorrect details may affect order delivery.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-lg font-bold mb-2">7. Contact Us</h2>
            <p className="text-sm text-gray-600 leading-6">
              If you have any questions about these Terms, contact our support team
              through the app or website.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Terms;