import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DNavbar from "./DNavbar"; // ✅ Import Navbar
import SDNavbar from "./SDNavbar"; // ✅ Import Sidebar

const SelectExercise = () => {
  const navigate = useNavigate();
  const [selectedExercise, setSelectedExercise] = useState("Squat"); // ✅ Default selection

  const startExercise = () => {
    navigate(`/activity/${selectedExercise}`); // ✅ Navigate to tracking page
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      {/* ✅ Navbar Section */}
      <DNavbar />

      <div className="flex flex-1 w-full">
        {/* ✅ Sidebar */}
        <SDNavbar />

        {/* ✅ Main Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Choose an Exercise</h2>

          {/* ✅ Exercise Selection Buttons */}
          <div className="flex flex-col items-center">
            {["Squat", "Push-up", "Jumping-Jack", "Crunch", "Lunge"].map((exercise) => (
              <div
                key={exercise}
                className={`text-black w-60 h-12 md:w-72 md:h-12 lg:w-64 lg:h-12 rounded-full flex justify-center items-center 
                  text-lg md:text-xl font-bold cursor-pointer m-3 md:m-4
                  ${selectedExercise === exercise ? "bg-yellow-400 text-[#30093f]" : "bg-white hover:bg-yellow-400 hover:text-[#30093f]"}`}
                onClick={() => setSelectedExercise(exercise)}
              >
                {exercise}
              </div>
            ))}
          </div>

          {/* ✅ Start Button */}
          <button
            className="w-60 h-12 md:w-64 md:h-12 lg:w-56 lg:h-12 bg-blue-500 text-white rounded-full font-bold 
              hover:bg-yellow-500 hover:text-[#30093f] cursor-pointer mt-6"
            onClick={startExercise}
          >
            Start
          </button>

          {/* ✅ Note */}
          <p className="text-white text-[12px] md:text-[14px] pt-5 opacity-50 w-[60vw] max-md:text-[10px]">
            Select an exercise and begin tracking your reps in real-time!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectExercise;
