import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import axios from "axios";
import DNavbar from "./DNavbar"; // ✅ Navbar
import SDNavbar from "./SDNavbar"; // ✅ Sidebar

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // ✅ Hook for navigation

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/leaderboard");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      {/* ✅ Navbar */}
      <DNavbar />

      <div className="flex flex-1 w-full">
        {/* ✅ Sidebar */}
        <SDNavbar />

        {/* ✅ Main Content */}
        <div className="flex-1 flex flex-col items-center text-center px-4 sm:px-8 md:px-16">
          <h2 className="text-3xl sm:text-4xl font-bold mt-6 text-yellow-400">
            🏆 Leaderboard
          </h2>

          <div className="w-full max-w-6xl bg-[#1f0729] rounded-lg p-5 mt-5 overflow-x-auto">
            {/* Table layout for larger screens */}
            <table className="w-full border-collapse hidden sm:table">
              <thead>
                <tr className="bg-yellow-400 text-[#30093f] font-bold text-lg">
                  <th className="border px-4 py-2">Rank</th>
                  <th className="border px-4 py-2">User</th>
                  <th className="border px-4 py-2">Points</th>
                  <th className="border px-4 py-2">Squats</th>
                  <th className="border px-4 py-2">Push-ups</th>
                  <th className="border px-4 py-2">Jumping Jacks</th>
                  <th className="border px-4 py-2">Crunches</th>
                  <th className="border px-4 py-2">Lunges</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="text-center hover:bg-[#380b4f]">
                      <td className="border px-4 py-2 font-bold">{index + 1}</td>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2 font-bold text-yellow-400">
                        {user.points || 0}
                      </td>
                      <td className="border px-4 py-2">{user.exercises.squats}</td>
                      <td className="border px-4 py-2">{user.exercises.pushups}</td>
                      <td className="border px-4 py-2">{user.exercises.jumpingJacks}</td>
                      <td className="border px-4 py-2">{user.exercises.crunches}</td>
                      <td className="border px-4 py-2">{user.exercises.lunges}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center text-yellow-400 py-4">
                      No leaderboard data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Horizontal layout for mobile screens */}
            <div className="w-full grid grid-cols-1 sm:hidden gap-4">
              {users.length > 0 ? (
                users.map((user, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 bg-[#380b4f] rounded-lg hover:bg-[#4a0b6f] transition-all"
                  >
                    <div className="font-bold text-yellow-400 text-xl">
                      {index + 1}
                    </div>
                    <div className="text-lg">{user.email}</div>
                    <div className="font-bold text-yellow-400">{user.points || 0}</div>
                    <div>Squats: {user.exercises.squats}</div>
                    <div>Push-ups: {user.exercises.pushups}</div>
                    <div>Jumping Jacks: {user.exercises.jumpingJacks}</div>
                    <div>Crunches: {user.exercises.crunches}</div>
                    <div>Lunges: {user.exercises.lunges}</div>
                  </div>
                ))
              ) : (
                <div className="text-center text-yellow-400 py-4 col-span-8">
                  No leaderboard data available.
                </div>
              )}
            </div>
          </div>

          {/* ✅ "Join a Challenge" Button */}
          <button
            className="mt-6 px-6 py-3 bg-yellow-400 text-[#30093f] font-bold rounded-lg 
              hover:bg-yellow-500 transition-all text-lg"
            onClick={() => navigate("/challenges")} // ✅ Navigate to Challenges Page
          >
            Join a Challenge 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
