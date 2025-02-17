import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DNavbar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const [visible2, setvisible2] = useState(false);
  const [visible, setvisible] = useState(false);
  const show = () => {
    setvisible(!visible);
  };

  return (
    <div className="relative max-md:hidden">
      {visible2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center">
          <div className="w-auto max-w-md bg-white rounded-lg text-[#1f0729] font-bold relative p-6 shadow-lg border border-gray-300">
            <div id="text" className="text-center text-lg"></div>
            
            <div
              className="bg-red-600 mt-6 px-6 py-2 flex items-center justify-center text-[17px] text-white rounded-full cursor-pointer hover:bg-red-500 mx-auto w-24"
              onClick={() => {
                setvisible2(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      )}
      <nav className="w-full h-16 bg-[#1f0729] flex items-center">
        <ul className="text-white font-dm-sans flex w-screen justify-around items-center rounded-full">
          {/* <li className="hover:cursor-pointer hover:text-yellow-400">Home</li> */}
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/activity")}
          >
            Home
          </li>
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => {
              setvisible2(true);
              setTimeout(() => {
                document.querySelector("#text").innerHTML =
                  "<p>Email: <span class='font-normal'><br>romani2181.be22@chitkara.edu.in<br>ananya1258.be22@chitkara.edu.in<br>aditya67.be22@chitkara.edu.in<br>ruhani2194.be22@chitkara.edu.in</span></p>";
              }, 0);
            }}
          >
            Contact
          </li>
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => {
              setvisible2(true);
              setTimeout(() => {
                document.querySelector("#text").innerHTML =
                  "<p class='font-normal text-base text-center'>We are a team of full-stack developers building user-friendly and scalable web applications. This project showcases our collaboration, technical skills, and commitment to delivering high-quality solutions.</p>";
              }, 0);
            }}
          >
            About us
          </li>
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </li>
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/goals")}
          >
            Goals
          </li>
          <li
            className="hover:cursor-pointer hover:text-yellow-400"
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
          <div
            className=" h-1 bg-purple-950 p-6 m-3 rounded-full flex justify-center items-center cursor-pointer hover:bg-purple-900"
            onClick={show}
          >
            Logout
          </div>
        </ul>
      </nav>
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"></div>
      )}
      <div
        className={`w-96 h-32 bg-purple-900 rounded-md absolute top-[50vh] left-[50vw] z-10 -translate-x-1/2 p-4 ${
          visible ? "block" : "hidden"
        }`}
      >
        <p className="text-white font-dm-sans text-lg">
          Are you sure you want to logout?
        </p>
        <div
          className="bg-purple-700 text-center rounded-md mt-2 cursor-pointer hover:bg-purple-950 text-white"
          onClick={logOut}
        >
          Yes
        </div>
        <div
          className="bg-purple-700 text-center rounded-md mt-2 cursor-pointer hover:bg-purple-950 text-white"
          onClick={show}
        >
          No
        </div>
      </div>
    </div>
  );
}

export default DNavbar;
