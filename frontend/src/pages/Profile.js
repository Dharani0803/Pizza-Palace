import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";

function Profile() {

    const navigate = useNavigate();
    const { user, setUser, showToast } = useContext(UserContext);
    const [name, setName] = useState(user?.name || "");
const [email] = useState(user?.email || "");
const [mobile, setMobile] = useState(user?.mobile || "");
const [dob, setDob] = useState(user?.dob || "");
const [gender, setGender] = useState(user?.gender || "");
const [address, setAddress] = useState(user?.address || "");


const handleSave = () => {
  const updatedUser = {
    ...user,
    name,
    email,
    mobile,
    dob,
    gender,
    address
  };

  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
showToast("Profile updated successfully 🎉");

  setTimeout(() => {
    navigate("/");
  }, 800);
};

return (
    <div className="min-h-screen bg-[#F5F5F7]">

    <nav className="flex items-center gap-4 px-5 py-4 bg-white shadow-sm">
        <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left cursor-pointer"></i>
        <h1 className="text-xl font-semibold">Edit Profile</h1>
    </nav>

    <div className="flex justify-center p-5">
    <div className="bg-white w-full max-w-xl rounded-2xl shadow-md p-6">

    <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-user text-4xl text-gray-500"></i>
        </div>
    </div>

    <form className="space-y-5">

        <div>
            <label className="text-sm font-semibold">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"/>
        </div>

        <div>
            <label className="text-sm font-semibold">Email Address</label>
            <input type="email" value={email} placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"/>
        </div>

        <div>
            <label className="text-sm font-semibold">Mobile Number</label>
            <input type="text"  placeholder="Enter mobile number"  value={mobile} onChange={(e) => setMobile(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"/>
        </div>

        <div>
            <label className="text-sm font-semibold">Date of Birth</label>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"/>
        </div>

        <div>
            <label className="text-sm font-semibold">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>
        </div>

        <div>
            <label className="text-sm font-semibold">Address</label>
            <textarea placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none h-28"/>
        </div>

        <button className="w-full bg-[#E31837] text-white py-3 rounded-xl font-semibold"
        type="button" onClick={handleSave}>Save Changes</button>

    </form>

    </div>
    </div>
    </div>
    );
    }

export default Profile;