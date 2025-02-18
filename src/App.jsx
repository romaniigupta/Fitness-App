import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SNavbar from "./components/SNavbar";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen bg-[#30093f] p-0 m-0">
        <Navbar />
        <div className="md:w-full">
          <SNavbar />
          {/* Home page with video background */}
          <div className="relative">
            <div className="absolute w-full h-full">
              {/* Fullscreen Video Background */}
              <video
                className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[8px]"
                autoPlay
                loop
                muted
              >
                <source
                  src="src/5319438-uhd_3840_2160_25fps.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Homepage content */}
            <div className="flex flex-col items-center justify-center h-screen text-center relative z-20">
              <p className="text-5xl font-bold text-[#FFFFFF] ">
                Start Your Fitness Journey Today
              </p>
              <p className="text-lg text-[#FFFFFF] pt-5 opacity-80 max-w-[700px] mx-auto">
                Transform your life with personalized workout plans, expert
                advice, and tools to track your progress. Our platform supports
                every step of your fitness journey!
              </p>
              <button
                onClick={() => {
                  navigate("/signin");
                }}
                className="mt-6 px-8 py-4 bg-[#1f0729] text-white rounded-full font-semibold text-lg transition-all hover:bg-yellow-400 hover:text-[#1f0729]"
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
        {/* Story Section */}
        <div className="bg-[#30093f] text-center py-20">
          <h2 className="text-4xl font-semibold text-white mb-6 max-w-4xl mx-auto">
            Our Fitness Story
          </h2>
          <p className="text-lg text-[#D0A7D3] max-w-4xl mx-auto leading-relaxed px-4 md:px-0">
            At Fitness Journey, our mission is to help individuals transform
            their lives through physical fitness. Whether you're just starting
            or have been working out for years, we are here to guide you towards
            better health and a stronger body. With customized fitness programs
            and expert advice, our team of professionals is committed to
            empowering you to take control of your health. Join our community
            and become the best version of yourself today!
          </p>
        </div>

        {/* Explore Our Fitness Programs Section */}
        <div className="text-center bg-[#30093f]">
          <h2 className="text-4xl font-semibold text-white mb-8 animate__animated animate__fadeIn animate__delay-3s">
            Explore Our Fitness Programs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-3 mr-3">
            <div className="bg-[#1f0729] p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[300px] animate__animated animate__fadeIn animate__delay-3s">
              <h3 className="text-2xl font-semibold text-white">
                Strength Training
              </h3>
              <p className="text-lg text-[#D0A7D3] mt-4">
                Build muscle and boost your metabolism with a structured
                strength training routine. Start with bodyweight exercises and
                progress to weight training.
              </p>
              {/* Icon for Strength Training */}
              <div className="mt-6 text-6xl text-yellow-400">
                <i className="fas fa-dumbbell"></i>
              </div>
            </div>
            <div className="bg-[#1f0729] p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[300px] animate__animated animate__fadeIn animate__delay-3.5s">
              <h3 className="text-2xl font-semibold text-white">
                Cardio Workouts
              </h3>
              <p className="text-lg text-[#D0A7D3] mt-4">
                Improve heart health and burn fat with high-intensity interval
                training (HIIT) or low-intensity steady-state cardio workouts.
              </p>
              {/* Icon for Cardio Workouts */}
              <div className="mt-6 text-6xl text-yellow-400">
                <i className="fas fa-running"></i>
              </div>
            </div>
            <div className="bg-[#1f0729] p-6 rounded-lg shadow-md flex flex-col justify-between min-h-[300px] animate__animated animate__fadeIn animate__delay-4s">
              <h3 className="text-2xl font-semibold text-white">
                Yoga & Flexibility
              </h3>
              <p className="text-lg text-[#D0A7D3] mt-4">
                Increase flexibility, reduce stress, and enhance your range of
                motion with guided yoga sessions.
              </p>
              {/* Icon for Yoga & Flexibility */}
              <div className="mt-6 text-6xl text-yellow-400">
                <i className="fas fa-spa"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-[#30093f] py-16 w-full">
          <h2 className="text-4xl font-semibold text-white text-center mb-8">
            What Our Users Say
          </h2>
          <div className="w-full mx-auto overflow-x-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-[#1f0729] p-6 rounded-xl shadow-md w-80 h-auto flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-[#D0A7D3] mt-1">- Sarah L.</p>
                </div>
                <p className="text-lg text-white mt-4">
                  "Fitness Journey has truly changed my life! The workouts are
                  easy to follow, and the community is so supportive."
                </p>
              </div>
              <div className="bg-[#1f0729] p-6 rounded-xl shadow-md w-80 h-auto flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-400">⭐⭐⭐⭐</div>
                  <p className="text-sm text-[#D0A7D3] mt-1">- John D.</p>
                </div>
                <p className="text-lg text-white mt-4">
                  "I love the personalized fitness plans. It helped me stay on
                  track and finally reach my goals!"
                </p>
              </div>
              <div className="bg-[#1f0729] p-6 rounded-xl shadow-md w-80 h-auto flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-[#D0A7D3] mt-1">- Emily G.</p>
                </div>
                <p className="text-lg text-white mt-4">
                  "The strength training program is amazing! I feel stronger and
                  more confident every day."
                </p>
              </div>
              <div className="bg-[#1f0729] p-6 rounded-xl shadow-md w-80 h-auto flex flex-col justify-between">
                <div className="flex items-center space-x-2">
                  <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
                  <p className="text-sm text-[#D0A7D3] mt-1">- Mark T.</p>
                </div>
                <p className="text-lg text-white mt-4">
                  "Yoga & Flexibility sessions are fantastic. They helped me
                  reduce stress and improve my flexibility."
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* Footer Section */}
        <footer className="bg-[#1f0729] text-white py-8 text-center">
          <p className="text-xl">
            &copy; 2025 Fitness Journey | All Rights Reserved
          </p>
          <p className="text-lg opacity-70">
            Privacy Policy | Terms of Service
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
