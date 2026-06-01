import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithPopup, } from "firebase/auth";
import { auth, googleProvider,} from "../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        navigate("/", { replace: true });
      } else if (user) {
        navigate("/", { replace: true });
      }
    }, [navigate]);

    const buildUser = (firebaseUser) => {
      const isAdmin = firebaseUser.email?.toLowerCase() === "dd1452327@gmail.com";
      return {
        email: firebaseUser.email,
        name: firebaseUser.displayName || "User",
        role: isAdmin ? "admin" : "user"
      };
    };
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
      if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = buildUser(userCredential.user);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", userCredential.user.accessToken);
      alert("Login Successful");
      navigate(userData.role === "admin" ? "/admin" : "/");
      } catch (error) {
        alert(error.message);
      }
    };

  const handleGoogleLogin = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);

    const userData = buildUser(userCredential.user);

    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userCredential.user.accessToken);

    alert("Google Login Successful");

    navigate(userData.role === "admin" ? "/admin" : "/");
  } catch (error) {
    alert(error.message);
  }
};

return (
  <div className="min-h-screen bg-[#F4F4F6] flex items-center justify-center">
      <div className="bg-white w-[400px] p-8 rounded-2xl shadow-sm">
        <p className="text-3xl font-bold mb-2">Welcome Back</p>
        <p className="text-gray-500 mb-8">Login to continue</p>

      <div className="mb-4">
        <p className="text-sm mb-2 font-semibold">Email</p>
        <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-4 py-3 rounded-xl outline-none"/>
      </div>

      <div className="mb-6">
          <p className="text-sm mb-2 font-semibold">Password</p>
          <input type="password" placeholder="Enter Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl outline-none"
          />
      </div>

      <button onClick={handleLogin} className="w-full bg-[#E31837] text-white py-3 rounded-xl font-semibold">
        Login</button>

      <button onClick={handleGoogleLogin}
        className="w-full border mt-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
        <i className="fa-brands fa-google"></i>
        Continue with Google
      </button>

      <p className="text-sm text-center mt-6">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#E31837] font-semibold">
          Signup
        </Link>
      </p>

    </div>

  </div>);
  }

export default Login;