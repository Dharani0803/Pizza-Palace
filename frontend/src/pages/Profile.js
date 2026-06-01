import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {

const navigate = useNavigate();
const { user } = useContext(UserContext);

return (

<div className="min-h-screen bg-[#F5F5F7]">

<nav className="flex items-center gap-4 px-5 py-4 bg-white shadow-sm">

<i
onClick={() => navigate(-1)}
className="fa-solid fa-arrow-left cursor-pointer"
></i>

<h1 className="text-xl font-semibold">
Edit Profile
</h1>

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
<label className="text-sm font-semibold">
Full Name
</label>

<input
type="text" value={user?.email || ""}
placeholder="Enter your name"
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"
/>
</div>

<div>
<label className="text-sm font-semibold">
Email Address
</label>

<input
type="email" value={user?.email || ""}
placeholder="Enter your email"
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"
/>
</div>

<div>
<label className="text-sm font-semibold">
Mobile Number
</label>

<input
type="text"
placeholder="Enter mobile number"
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"
/>
</div>

<div>
<label className="text-sm font-semibold">
Date of Birth
</label>

<input
type="date"
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"
/>
</div>

<div>
<label className="text-sm font-semibold">
Gender
</label>

<select
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none"
>

<option>Male</option>
<option>Female</option>
<option>Other</option>

</select>

</div>

<div>
<label className="text-sm font-semibold">
Address
</label>

<textarea
placeholder="Enter address"
className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none h-28"
/>
</div>

<button
className="w-full bg-[#E31837] text-white py-3 rounded-xl font-semibold"
>
Save Changes
</button>

</form>

</div>

</div>

</div>

);

}

export default Profile;