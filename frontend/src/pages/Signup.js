import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Signup Successful");
      navigate("/");

    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );

      alert("Google Signup Successful");
      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] flex items-center justify-center">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-sm">
        <p className="text-3xl font-bold mb-2">
          Create Account
        </p>
        <p className="text-gray-500 mb-8">
          Signup to continue
        </p>

        {/* EMAIL */}
        <div className="mb-4">
          <p className="text-sm mb-2 font-semibold">
            Email
          </p>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border px-4 py-3 rounded-xl outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <p className="text-sm mb-2 font-semibold">
            Password
          </p>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border px-4 py-3 rounded-xl outline-none"
          />
        </div>

        {/* SIGNUP */}
        <button
          onClick={handleSignup}
          className="w-full bg-[#E31837] text-white py-3 rounded-xl font-semibold"
        >
          Signup
        </button>

        {/* GOOGLE */}
        <button
          onClick={handleGoogleSignup}
          className="w-full border mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          <i className="fa-brands fa-google"></i>

          Continue with Google
        </button>

        {/* LOGIN */}
        <p className="text-sm text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#E31837] font-semibold"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;