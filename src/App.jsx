// import { useState } from "react";
// import Navbar from "./components/Navbar";
// import { useNavigate } from "react-router-dom";
// import SNavbar from "./components/SNavbar";

// function App() {
//   const [count, setCount] = useState(0);
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="h-screen bg-[#30093f] p-0 m-0 relative">
//         <Navbar />

//         <div className="flex md:w-full">
//           <SNavbar />
//           <div className="flex flex-col mt-40 mx-auto w-[100vw] items-center ">
//             <p className="text-white text-7xl text-center md:w-[100%] max-md:text-4xl">
//               Track your <br />
//               <span className="text-yellow-400">Fitness</span> journey
//             </p>
//             <p className="text-white text-center text-[14px] pt-5 font-dm-sans opacity-50 w-[50vw] max-md:w-72 max-md:text-[9px]">
//               We will provide you with the best resources to support every step
//               of your fitness journey, ensuring you have everything you need to
//               stay on track and meet your health goals. With our tailored
//               guidance and reliable tools, you'll be able to monitor your
//               progress, set achievable milestones, and gain insights into every
//               aspect of your fitness
//             </p>

//             <button
//               onClick={() => {
//                 navigate("/signin");
//               }}
//               className="w-20 h-5  bg-yellow-400 mt-4 text-center rounded-full font-dm-sans font-bold text-[12px] flex items-center justify-center hover:cursor-pointer transition-all hover:bg-white max-md:h-3 max-md:text-[8px]"
//             >
//               Sign In
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

//"src\5319438-uhd_3840_2160_25fps.mp4"
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import SNavbar from "./components/SNavbar";

// function App() {
//   const [count, setCount] = useState(0);
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="relative">
//         {/* Navbar stays at the top */}
//         <Navbar />
//         <SNavbar />

//         {/* Home page with video background */}
//         <div className="relative">
//           <div className="absolute top-0 left-0 w-full h-full">
//             {/* Fullscreen Video Background */}
//             <video
//               className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[8px]"
//               autoPlay
//               loop
//               muted
//             >
//               <source src="src\5319438-uhd_3840_2160_25fps.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Homepage content */}
//           <div className="flex flex-col items-center justify-center h-screen text-center relative z-20">
//             <p className="text-5xl font-bold text-[#FFFFFF]">
//               Start Your Fitness Journey Today
//             </p>
//             <p className="text-lg text-[#FFFFFF] pt-5 opacity-80 max-w-[700px] mx-auto">
//               Transform your life with personalized workout plans, expert advice, and
//               tools to track your progress. Our platform supports every step of your
//               fitness journey!
//             </p>
//             <button
//               onClick={() => {
//                 navigate("/signup");
//               }}
//               className="mt-6 px-8 py-4 bg-[#9b4dca] text-white rounded-full font-semibold text-lg transition-all hover:bg-[#FFFFFF]"
//             >
//               Join Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Story Section */}
//       <div className="bg-[#2e1a47] text-center py-20">
//         <h2 className="text-4xl font-semibold text-white mb-6">Our Fitness Story</h2>
//         <p className="text-lg text-[#D0A7D3] max-w-3xl mx-auto">
//           At Fitness Journey, our mission is to help individuals transform their
//           lives through physical fitness. Whether you're just starting or have been
//           working out for years, we are here to guide you towards better health and
//           a stronger body. With customized fitness programs and expert advice, our
//           team of professionals is committed to empowering you to take control of
//           your health. Join our community and become the best version of yourself today!
//         </p>
//       </div>

//       {/* Explore Our Fitness Programs Section */}
//       <div className="my-16 text-center">
//         <h2 className="text-3xl font-semibold text-[#9b4dca] mb-8">
//           Explore Our Fitness Programs
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Strength Training</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Build muscle and boost your metabolism with a structured strength training
//               routine. Start with bodyweight exercises and progress to weight training.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Cardio Workouts</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Improve heart health and burn fat with high-intensity interval training
//               (HIIT) or low-intensity steady-state cardio workouts.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Yoga & Flexibility</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Increase flexibility, reduce stress, and enhance your range of motion with
//               guided yoga sessions.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section with Moving Effect */}
//       <div className="bg-[#2e1a47] py-16">
//         <h2 className="text-4xl font-semibold text-white text-center mb-8">What Our Users Say</h2>
//         <div className="max-w-4xl mx-auto overflow-x-auto">
//           <div className="flex space-x-8 animate-marquee">
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"Fitness Journey has truly changed my life! The workouts are easy to follow, and the community is so supportive."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Sarah L.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"I love the personalized fitness plans. It helped me stay on track and finally reach my goals!"</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- John D.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"The strength training program is amazing! I feel stronger and more confident every day."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Emily G.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"Yoga & Flexibility sessions are fantastic. They helped me reduce stress and improve my flexibility."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Mark T.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"The cardio workouts pushed me to my limits, and I’m seeing great results. So happy I joined!"</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Laura B.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Meet The Team Section */}
//       <div className="bg-[#2e1a47] text-center py-16">
//         <h2 className="text-4xl font-semibold text-white mb-8">Meet Our Team</h2>
//         <div className="flex flex-wrap justify-center gap-8">
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-60">
//             <img src="https://randomuser.me/api/portraits/men/21.jpg" alt="Team Member 1" className="w-full h-40 object-cover rounded-full" />
//             <h3 className="text-xl font-semibold text-white mt-4">Alice Johnson</h3>
//             <p className="text-[#D0A7D3]">Fitness Coach</p>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-60">
//             <img src="https://randomuser.me/api/portraits/men/15.jpg" alt="Team Member 2" className="w-full h-40 object-cover rounded-full" />
//             <h3 className="text-xl font-semibold text-white mt-4">David Lee</h3>
//             <p className="text-[#D0A7D3]">Nutrition Expert</p>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-60">
//             <img src="https://randomuser.me/api/portraits/women/4.jpg" alt="Team Member 3" className="w-full h-40 object-cover rounded-full" />
//             <h3 className="text-xl font-semibold text-white mt-4">Sophia Chen</h3>
//             <p className="text-[#D0A7D3]">Yoga Instructor</p>
//           </div>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <footer className="bg-[#3e1c6c] text-white py-6 mt-20 text-center">
//         <p>&copy; 2025 Fitness Journey | All Rights Reserved</p>
//         <p className="text-sm opacity-70">Privacy Policy | Terms of Service</p>
//       </footer>
//     </>
//   );
// }

// export default App;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import SNavbar from "./components/SNavbar";

// function App() {
//   const [count, setCount] = useState(0);
//   const navigate = useNavigate();

//   return (
//     <>
//       <div className="relative">
//         {/* Navbar stays at the top */}
//         <Navbar />
//         <SNavbar />

//         {/* Home page with video background */}
//         <div className="relative">
//           <div className="absolute top-0 left-0 w-full h-full">
//             {/* Fullscreen Video Background */}
//             <video
//               className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[8px]"
//               autoPlay
//               loop
//               muted
//             >
//               <source src="src\5319438-uhd_3840_2160_25fps.mp4" type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* Homepage content */}
//           <div className="flex flex-col items-center justify-center h-screen text-center relative z-20">
//             <p className="text-5xl font-bold text-[#FFFFFF]">
//               Start Your Fitness Journey Today
//             </p>
//             <p className="text-lg text-[#FFFFFF] pt-5 opacity-80 max-w-[700px] mx-auto">
//               Transform your life with personalized workout plans, expert advice, and
//               tools to track your progress. Our platform supports every step of your
//               fitness journey!
//             </p>
//             <button
//               onClick={() => {
//                 navigate("/signup");
//               }}
//               className="mt-6 px-8 py-4 bg-[#9b4dca] text-white rounded-full font-semibold text-lg transition-all hover:bg-[#FFFFFF]"
//             >
//               Join Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Story Section */}
//       <div className="bg-[#2e1a47] text-center py-20">
//         <h2 className="text-4xl font-semibold text-white mb-6">Our Fitness Story</h2>
//         <p className="text-lg text-[#D0A7D3] max-w-3xl mx-auto">
//           At Fitness Journey, our mission is to help individuals transform their
//           lives through physical fitness. Whether you're just starting or have been
//           working out for years, we are here to guide you towards better health and
//           a stronger body. With customized fitness programs and expert advice, our
//           team of professionals is committed to empowering you to take control of
//           your health. Join our community and become the best version of yourself today!
//         </p>
//       </div>

//       {/* Explore Our Fitness Programs Section */}
//       <div className="my-16 text-center">
//         <h2 className="text-3xl font-semibold text-[#9b4dca] mb-8">
//           Explore Our Fitness Programs
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Strength Training</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Build muscle and boost your metabolism with a structured strength training
//               routine. Start with bodyweight exercises and progress to weight training.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Cardio Workouts</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Improve heart health and burn fat with high-intensity interval training
//               (HIIT) or low-intensity steady-state cardio workouts.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//           <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md">
//             <h3 className="text-2xl font-semibold text-white">Yoga & Flexibility</h3>
//             <p className="text-lg text-[#D0A7D3] mt-4">
//               Increase flexibility, reduce stress, and enhance your range of motion with
//               guided yoga sessions.
//             </p>
//             <button
//               onClick={() => navigate("/programs")}
//               className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews Section with Marquee Scrolling Effect */}
//       <div className="bg-[#2e1a47] py-16">
//         <h2 className="text-4xl font-semibold text-white text-center mb-8">What Our Users Say</h2>
//         <div className="max-w-4xl mx-auto overflow-hidden">
//           <div className="reviews-marquee flex space-x-8 animate-marquee">
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"Fitness Journey has truly changed my life! The workouts are easy to follow, and the community is so supportive."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Sarah L.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"I love the personalized fitness plans. It helped me stay on track and finally reach my goals!"</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- John D.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"The strength training program is amazing! I feel stronger and more confident every day."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Emily G.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"Yoga & Flexibility sessions are fantastic. They helped me reduce stress and improve my flexibility."</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Mark T.</p>
//             </div>
//             <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
//               <p className="text-lg text-white">"The cardio workouts pushed me to my limits, and I’m seeing great results. So happy I joined!"</p>
//               <p className="text-sm text-[#D0A7D3] mt-4">- Laura B.</p>
//             </div>
//           </div>
//         </div>
//       </div>


//       {/* Footer Section */}
//       <footer className="bg-[#3e1c6c] text-white py-6 mt-20 text-center">
//         <p>&copy; 2025 Fitness Journey | All Rights Reserved</p>
//         <p className="text-sm opacity-70">Privacy Policy | Terms of Service</p>
//       </footer>
//     </>
//   );
// }

// export default App;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SNavbar from "./components/SNavbar";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        {/* Navbar stays at the top */}
        <Navbar />
        <SNavbar />

        {/* Home page with video background */}
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Fullscreen Video Background */}
            <video
              className="absolute top-0 left-0 w-full h-full object-cover z-0 blur-[8px]"
              autoPlay
              loop
              muted
            >
              <source src="src/5319438-uhd_3840_2160_25fps.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Homepage content */}
          <div className="flex flex-col items-center justify-center h-screen text-center relative z-20">
            <p className="text-5xl font-bold text-[#FFFFFF] animate__animated animate__fadeIn">
              Start Your Fitness Journey Today
            </p>
            <p className="text-lg text-[#FFFFFF] pt-5 opacity-80 max-w-[700px] mx-auto animate__animated animate__fadeIn animate__delay-1s">
              Transform your life with personalized workout plans, expert advice, and
              tools to track your progress. Our platform supports every step of your
              fitness journey!
            </p>
            <button
              onClick={() => {
                navigate("/signin");
              }}
              className="mt-6 px-8 py-4 bg-[#9b4dca] text-white rounded-full font-semibold text-lg transition-all hover:bg-[#FFFFFF] animate__animated animate__fadeIn animate__delay-2s"
              // className="w-25 h-10 p-4 bg-yellow-400 mt-4 text-center rounded-full font-dm-sans font-bold text-[20px] flex items-center justify-center hover:cursor-pointer transition-all hover:bg-white max-md:h-3 max-md:text-[8px]"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-[#2e1a47] text-center py-20">
        <h2 className="text-4xl font-semibold text-white mb-6 animate__animated animate__fadeIn animate__delay-2s">Our Fitness Story</h2>
        <p className="text-lg text-[#D0A7D3] max-w-3xl mx-auto animate__animated animate__fadeIn animate__delay-2.5s">
          At Fitness Journey, our mission is to help individuals transform their lives through physical fitness. Whether you're just starting or have been
          working out for years, we are here to guide you towards better health and a stronger body. With customized fitness programs and expert advice, our
          team of professionals is committed to empowering you to take control of your health. Join our community and become the best version of yourself today!
        </p>
      </div>

      {/* Explore Our Fitness Programs Section */}
      <div className="my-16 text-center">
        <h2 className="text-3xl font-semibold text-[#9b4dca] mb-8 animate__animated animate__fadeIn animate__delay-3s">
          Explore Our Fitness Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-3s">
            <h3 className="text-2xl font-semibold text-white">Strength Training</h3>
            <p className="text-lg text-[#D0A7D3] mt-4">
              Build muscle and boost your metabolism with a structured strength training
              routine. Start with bodyweight exercises and progress to weight training.
            </p>
            <button
              onClick={() => navigate("/programs")}
              className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
            >
              Get Started
            </button>
          </div>
          <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-3.5s">
            <h3 className="text-2xl font-semibold text-white">Cardio Workouts</h3>
            <p className="text-lg text-[#D0A7D3] mt-4">
              Improve heart health and burn fat with high-intensity interval training
              (HIIT) or low-intensity steady-state cardio workouts.
            </p>
            <button
              onClick={() => navigate("/programs")}
              className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
            >
              Get Started
            </button>
          </div>
          <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md animate__animated animate__fadeIn animate__delay-4s">
            <h3 className="text-2xl font-semibold text-white">Yoga & Flexibility</h3>
            <p className="text-lg text-[#D0A7D3] mt-4">
              Increase flexibility, reduce stress, and enhance your range of motion with
              guided yoga sessions.
            </p>
            <button
              onClick={() => navigate("/programs")}
              className="mt-6 px-6 py-3 bg-[#9b4dca] text-white rounded-full font-semibold text-sm"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-[#2e1a47] py-16">
        <h2 className="text-4xl font-semibold text-white text-center mb-8 animate__animated animate__fadeIn animate__delay-4.5s">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <div className="flex space-x-8 animate-marquee">
            <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-white">"Fitness Journey has truly changed my life! The workouts are easy to follow, and the community is so supportive."</p>
              <p className="text-sm text-[#D0A7D3] mt-4">- Sarah L.</p>
            </div>
            <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-white">"I love the personalized fitness plans. It helped me stay on track and finally reach my goals!"</p>
              <p className="text-sm text-[#D0A7D3] mt-4">- John D.</p>
            </div>
            <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-white">"The strength training program is amazing! I feel stronger and more confident every day."</p>
              <p className="text-sm text-[#D0A7D3] mt-4">- Emily G.</p>
            </div>
            <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-white">"Yoga & Flexibility sessions are fantastic. They helped me reduce stress and improve my flexibility."</p>
              <p className="text-sm text-[#D0A7D3] mt-4">- Mark T.</p>
            </div>
            <div className="bg-[#3e1c6c] p-6 rounded-lg shadow-md w-80">
              <p className="text-lg text-white">"The cardio workouts pushed me to my limits, and I’m seeing great results. So happy I joined!"</p>
              <p className="text-sm text-[#D0A7D3] mt-4">- Laura B.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#3e1c6c] text-white py-6 mt-20 text-center">
        <p>&copy; 2025 Fitness Journey | All Rights Reserved</p>
        <p className="text-sm opacity-70">Privacy Policy | Terms of Service</p>
      </footer>
    </>
  );
}

export default App;
