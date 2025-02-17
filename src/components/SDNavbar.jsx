import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SDNavbar() {
  const [visible2, setvisible2] = useState(false);
  const [visible, setvisible] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };
  const show = () => {
    setvisible(!visible);
  };
  return (
    <div className="min-h-screen w-[12vw] bg-[#1f0729] top-0 left-0 md:hidden flex flex-col items-center">
      <i
        className="fa-solid fa-home text-white text-lg my-8 cursor-pointer m-4 "
        onClick={() => {
          navigate('/activity')}}
      ></i>
      <i
        className="fa-solid fa-book-open text-white text-lg my-8 cursor-pointer m-4 "
        onClick={() => {
          navigate('/leaderboard')}}
      ></i>
      <i
        className="fa-solid fa-power-off text-white text-lg my-8 cursor-pointer m-4"
        onClick={show}
      ></i>
      <i
        className="fa-solid fa-user text-white text-lg my-8 cursor-pointer m-4"
        onClick={()=>{navigate('/profile')}}
      ></i>

      

      {visible2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center">
          <div className="w-96 h-96 bg-white rounded-md text-[#1f0729] flex justify-center items-center  font-bold relative p-4">
            <div id="text"></div>
            <div
              className="bg-red-600 absolute bottom-1 px-4 text-white rounded-full cursor-pointer hover:bg-red-500"
              onClick={() => {
                setvisible2(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      )}
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

export default SDNavbar;
