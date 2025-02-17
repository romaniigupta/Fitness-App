import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DNavbar from "./DNavbar"; // ✅ Import Navbar
import SDNavbar from "./SDNavbar"; // ✅ Import Sidebar

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("User not logged in.");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/getdata", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to load profile.");
      }
    };

    fetchUserData();
  }, [navigate]);
  console.log(userData);
  
  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#30093f] text-white">
        <h2 className="text-2xl font-bold">Loading Profile...</h2>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      {/* ✅ Navbar Section */}
      <DNavbar />

      <div className="flex flex-1 w-full">
        {/* ✅ Sidebar */}
        <SDNavbar />

        {/* ✅ Profile Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Profile</h2>
          <div className="bg-[#4f1d5f] shadow-lg rounded-lg p-6 w-full max-w-md text-center">
            <div className="mb-4">
              <p className="text-xl font-semibold">👤 {userData.name || "Not Provided"}</p>
              <p className="text-lg">📧 {userData.email}</p>
              <p className="text-lg">🚻 Gender: {userData.gender || "Not Provided"}</p>
              <p className="text-lg">🎂 DOB: {new Date(userData.date).toLocaleDateString() || "Not Provided"}</p>
            </div>
            <div className="text-lg space-y-2">
              <p>📏 Height: {userData.height ? `${userData.height} ${userData.lengthScale || "cm"}` : "Not Provided"}</p>
              <p>⚖️ Weight: {userData.weight ? `${userData.weight} ${userData.weightScale || "kg"}` : "Not Provided"}</p>
            </div>

            <button
              onClick={() => navigate("/activity")} // Navigate to the dashboard
              className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-500 hover:text-[#30093f] transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
