import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SNavbar() {
  const navigate = useNavigate();
  const [visible2, setvisible2] = useState(false);
  return (
    <div className="h-screen w-[12vw] bg-[#1f0729] top-0 left-0 md:hidden flex flex-col items-center">
      <i
        className="fa-solid fa-house text-white text-lg my-8 cursor-pointer m-4"
        onClick={() => navigate("/activity")}
      ></i>
      <i
        className="fa-solid fa-phone text-white text-lg my-8 cursor-pointer m-4"
        onClick={() => {
          setvisible2(true);
          setTimeout(() => {
            document.querySelector("#text").innerHTML =
              "<p>Email: <span class='font-normal'><br>romani2181.be22@chitkara.edu.in<br>ananya1258.be22@chitkara.edu.in<br>aditya67.be22@chitkara.edu.in<br>ruhani2194.be22@chitkara.edu.in</span></p>";
          }, 0);
        }}
      ></i>

      <i
        className="fa-solid fa-child text-white text-lg my-8 cursor-pointer m-4 "
        onClick={() => {
          setvisible2(true);
          setTimeout(() => {
            document.querySelector("#text").innerHTML =
              "<p class='font-normal text-base text-center'>We are a team of full-stack developers building user-friendly and scalable web applications. This project showcases our collaboration, technical skills, and commitment to delivering high-quality solutions.</p>";
          }, 0);
        }}
      ></i>

      <i
        className="fa-solid fa-book-open text-white text-lg my-8 cursor-pointer m-4 "
        onClick={() => {
          setvisible2(true);
          setTimeout(() => {
            document.querySelector("#text").innerHTML =
              "<p class='font-normal text-base text-center'>This app has all the essential micro and macronutients data available for you to track your fitness needs. Whether you want to gain or loss the weight this app will guide you throughout achieving your fitness goals</p>";
          }, 0);
        }}
      ></i>

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
    </div>
  );
}

export default SNavbar;
