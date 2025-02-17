// import React, { useRef, useEffect, useState } from "react";
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import Webcam from "react-webcam";
// import axios from "axios";

// const Activity = () => {
//   const webcamRef = useRef(null);
//   const [squatCount, setSquatCount] = useState(0);
//   const [feedback, setFeedback] = useState("Stand straight to start");

//   let dir = 0; // 0 = going down, 1 = going up (to count rep)

//   useEffect(() => {
//     const runPoseDetection = async () => {
//       await tf.ready();
//       const detector = await posedetection.createDetector(
//         posedetection.SupportedModels.MoveNet,
//         { modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER }
//       );

//       const detectPose = async () => {
//         if (
//           webcamRef.current &&
//           webcamRef.current.video.readyState === 4
//         ) {
//           const video = webcamRef.current.video;
//           const poses = await detector.estimatePoses(video);

//           if (poses.length > 0) {
//             const keypoints = poses[0].keypoints;
//             handleSquatDetection(keypoints);
//           }
//         }
//         requestAnimationFrame(detectPose);
//       };

//       detectPose();
//     };

//     runPoseDetection();
//   }, []);

//   const handleSquatDetection = (keypoints) => {
//     const leftHip = keypoints.find((point) => point.name === "left_hip");
//     const leftKnee = keypoints.find((point) => point.name === "left_knee");
//     const rightHip = keypoints.find((point) => point.name === "right_hip");
//     const rightKnee = keypoints.find((point) => point.name === "right_knee");

//     if (leftHip && leftKnee && rightHip && rightKnee) {
//       const leftKneeAngle = calculateAngle(leftHip, leftKnee);
//       const rightKneeAngle = calculateAngle(rightHip, rightKnee);

//       const kneeAngleThresholdLow = 100; // Squatting position (knees bent)
//       const kneeAngleThresholdHigh = 150; // Standing position

//       if (leftKneeAngle < kneeAngleThresholdLow && rightKneeAngle < kneeAngleThresholdLow) {
//         if (dir === 0) {
//           setFeedback("Squatting... Go lower!");
//           dir = 1; // Now waiting for standing up
//         }
//       } else if (
//         leftKneeAngle > kneeAngleThresholdHigh &&
//         rightKneeAngle > kneeAngleThresholdHigh
//       ) {
//         if (dir === 1) {
//           setSquatCount((prevCount) => prevCount + 1);
//           setFeedback("Good squat! Stand straight.");
//           dir = 0; // Reset for next rep
//         }
//       }
//     }
//   };

//   const calculateAngle = (hip, knee) => {
//     const dx = knee.x - hip.x;
//     const dy = knee.y - hip.y;
//     const angle = Math.atan2(dy, dx) * (180 / Math.PI);
//     return Math.abs(angle);
//   };

//   const saveDataToBackend = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/exercises", {
//         squats: squatCount,
//       });
//       alert("Exercise data saved!");
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold">Squat Tracker</h2>
//       <Webcam ref={webcamRef} className="w-full max-w-lg" />
//       <p className="mt-4 text-lg">{feedback}</p>
//       <p>Squats: {squatCount}</p>
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={saveDataToBackend}
//       >
//         Save Progress
//       </button>
//     </div>
//   );
// };

// export default Activity;

import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ Import useParams
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import axios from "axios";
import DNavbar from "./DNavbar";
import SDNavbar from "./SDNavbar";

const Activity = () => {
  const navigate = useNavigate();
  const { exercise } = useParams(); // ✅ Get exercise type from URL
  const webcamRef = useRef(null);
  const [squatCount, setSquatCount] = useState(0);
  const [feedback, setFeedback] = useState("Stand straight to start");

  let dir = 0;
  // ✅ Video Mapping for Different Exercises
  const exerciseVideos = {
    "Push-up": "/assets/push-up.mp4",
    Squat: "/assets/squat-animation.mp4",
    "Jumping-Jack": "/assets/jumping-jack.mp4",
    Crunch: "/assets/crunch.mp4",
    Lunge: "/assets/lunge.mp4",
  };

  useEffect(() => {
    const runPoseDetection = async () => {
      await tf.ready();
      const detector = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        { modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER }
      );

      const detectPose = async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video;
          const poses = await detector.estimatePoses(video);

          if (poses.length > 0) {
            const keypoints = poses[0].keypoints;
            handleSquatDetection(keypoints);
          }
        }
        requestAnimationFrame(detectPose);
      };

      detectPose();
    };

    runPoseDetection();
  }, []);

  // const handleSquatDetection = (keypoints) => {
  //   const leftHip = keypoints.find((point) => point.name === "left_hip");
  //   const leftKnee = keypoints.find((point) => point.name === "left_knee");
  //   const rightHip = keypoints.find((point) => point.name === "right_hip");
  //   const rightKnee = keypoints.find((point) => point.name === "right_knee");

  //   if (leftHip && leftKnee && rightHip && rightKnee) {
  //     const leftKneeAngle = calculateAngle(leftHip, leftKnee);
  //     const rightKneeAngle = calculateAngle(rightHip, rightKnee);

  //     if (leftKneeAngle < 100 && rightKneeAngle < 100) {
  //       if (dir === 0) {
  //         setFeedback("Squatting... Keep going!");
  //         dir = 1;
  //       }
  //     } else if (leftKneeAngle > 150 && rightKneeAngle > 150) {
  //       if (dir === 1) {
  //         setSquatCount((prevCount) => prevCount + 1);
  //         setFeedback("Great squat! Stand tall.");
  //         dir = 0;
  //       }
  //     }
  //   }
  // };
  const handleSquatDetection = (keypoints) => {
    const leftHip = keypoints.find((point) => point.name === "left_hip");
    const leftKnee = keypoints.find((point) => point.name === "left_knee");
    const rightHip = keypoints.find((point) => point.name === "right_hip");
    const rightKnee = keypoints.find((point) => point.name === "right_knee");

    if (leftHip && leftKnee && rightHip && rightKnee) {
      const leftKneeAngle = calculateAngle(leftHip, leftKnee);
      const rightKneeAngle = calculateAngle(rightHip, rightKnee);

      const kneeAngleThresholdLow = 100; // 🔥 Less strict
      const kneeAngleThresholdHigh = 150; // 🔥 Faster rep count

      if (leftKneeAngle < kneeAngleThresholdLow && rightKneeAngle < kneeAngleThresholdLow) {
        if (dir === 0) {
          setFeedback("Squatting... Keep going!");
          dir = 1;
        }
      } else if (
        leftKneeAngle > kneeAngleThresholdHigh &&
        rightKneeAngle > kneeAngleThresholdHigh
      ) {
        if (dir === 1) {
          setSquatCount((prevCount) => prevCount + 1);
          setFeedback("Great squat! Stand tall.");
          dir = 0;
        }
      }
    }
  };
  const calculateAngle = (hip, knee) => {
    const dx = knee.x - hip.x;
    const dy = knee.y - hip.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return Math.abs(angle);
  };

  const saveDataToBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        return;
      }
  
      // ✅ Map frontend exercise name to backend schema
      const exerciseMapping = {
        Squat: "squats",
        "Push-up": "pushups",
        "Jumping-Jack": "jumpingJacks",
        Crunch: "crunches",
        Lunge: "lunges",
      };
  
      const backendExercise = exerciseMapping[exercise];
  
      if (!backendExercise) {
        alert("Invalid exercise type.");
        return;
      }
  
      const exerciseData = {
        exercise: backendExercise, // ✅ Send correctly formatted name
        reps: squatCount,
        challengeCompleted: true,
      };
  
      await axios.post("http://localhost:3000/api/exercises", exerciseData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Exercise data saved!");
      navigate("/leaderboard");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  

  // const saveDataToBackend = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("User not logged in.");
  //       return;
  //     }

  //     const exerciseData = {
  //       exercise,
  //       reps: squatCount,
  //       challengeCompleted: true,
  //     };

  //     await axios.post("http://localhost:3000/api/exercises", exerciseData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     alert("Exercise data saved!");
  //     navigate("/leaderboard");
  //   } catch (error) {
  //     console.error("Error saving data:", error);
  //   }
  // };



  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      {/* ✅ Navbar */}
      <DNavbar />

      <div className="flex flex-1 w-full">
        {/* ✅ Sidebar */}
        <SDNavbar />

        {/* ✅ Activity Content */}
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 p-4">
          {/* ✅ Left Side: Exercise Animation Video */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <video
              className="w-full max-w-[90%] md:max-w-[80%] h-auto rounded-lg shadow-lg"
              autoPlay
              loop
              muted
            >
              <source
                src={exerciseVideos[exercise] || "/assets/default.mp4"} // ✅ Dynamic video selection
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* ✅ Right Side: Webcam and Reps Counter */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
            <h5 className="text-3xl md:text-4xl font-bold mb-4">{exercise} Tracker</h5>
            <div className="bg-[#4f1d5f] shadow-lg rounded-lg p-2 w-full max-w-[90%] md:max-w-[80%] text-center flex flex-col">
              <Webcam ref={webcamRef} className="w-full h-full object-cover rounded-lg" />
            </div>
            <p className="text-xl font-semibold mt-4">Count reps: {squatCount}</p>
            <button
              onClick={saveDataToBackend}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-500 hover:text-[#30093f] transition"
            >
              Save Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;


// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import Webcam from "react-webcam";
// import axios from "axios";
// import DNavbar from "./DNavbar"; // ✅ Import Navbar
// import SDNavbar from "./SDNavbar"; // ✅ Import Sidebar

// const Activity = () => {
//   const navigate = useNavigate();
//   const webcamRef = useRef(null);
//   const [squatCount, setSquatCount] = useState(0);
//   const [feedback, setFeedback] = useState("Stand straight to start");

//   let dir = 0;

//   useEffect(() => {
//     const runPoseDetection = async () => {
//       await tf.ready();
//       const detector = await posedetection.createDetector(
//         posedetection.SupportedModels.MoveNet,
//         { modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER }
//       );

//       const detectPose = async () => {
//         if (
//           webcamRef.current &&
//           webcamRef.current.video.readyState === 4
//         ) {
//           const video = webcamRef.current.video;
//           const poses = await detector.estimatePoses(video);

//           if (poses.length > 0) {
//             const keypoints = poses[0].keypoints;
//             handleSquatDetection(keypoints);
//           }
//         }
//         requestAnimationFrame(detectPose);
//       };

//       detectPose();
//     };

//     runPoseDetection();
//   }, []);

//   const handleSquatDetection = (keypoints) => {
//     const leftHip = keypoints.find((point) => point.name === "left_hip");
//     const leftKnee = keypoints.find((point) => point.name === "left_knee");
//     const rightHip = keypoints.find((point) => point.name === "right_hip");
//     const rightKnee = keypoints.find((point) => point.name === "right_knee");

//     if (leftHip && leftKnee && rightHip && rightKnee) {
//       const leftKneeAngle = calculateAngle(leftHip, leftKnee);
//       const rightKneeAngle = calculateAngle(rightHip, rightKnee);

//       const kneeAngleThresholdLow = 100; // 🔥 Less strict
//       const kneeAngleThresholdHigh = 150; // 🔥 Faster rep count

//       if (leftKneeAngle < kneeAngleThresholdLow && rightKneeAngle < kneeAngleThresholdLow) {
//         if (dir === 0) {
//           setFeedback("Squatting... Keep going!");
//           dir = 1;
//         }
//       } else if (
//         leftKneeAngle > kneeAngleThresholdHigh &&
//         rightKneeAngle > kneeAngleThresholdHigh
//       ) {
//         if (dir === 1) {
//           setSquatCount((prevCount) => prevCount + 1);
//           setFeedback("Great squat! Stand tall.");
//           dir = 0;
//         }
//       }
//     }
//   };

//   const calculateAngle = (hip, knee) => {
//     const dx = knee.x - hip.x;
//     const dy = knee.y - hip.y;
//     const angle = Math.atan2(dy, dx) * (180 / Math.PI);
//     return Math.abs(angle);
//   };

//   const saveDataToBackend = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         alert("User not logged in.");
//         return;
//       }
  
//       const exerciseData = {
//         exerciseType: "squats",  // Specify the exercise type here
//         reps: squatCount,       // The count of squats
//         challengeCompleted: true, // Set this according to the challenge completion status
//       };
  
//       await axios.post(
//         "http://localhost:3000/api/exercises",
//         exerciseData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
  
//       alert("Exercise data saved!");
//       navigate("/leaderboard");
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
  
  
   
//   return (
// <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
//   {/* ✅ Navbar Section */}
//   <DNavbar />

//   <div className="flex flex-1 w-full">
//     {/* ✅ Sidebar */}
//     <SDNavbar />

//     {/* ✅ Activity Content */}
//     <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 p-4">
//       {/* Left Side: Squat Animation Video */}
//       <div className="w-full md:w-1/2 flex justify-center items-center">
//         <video
//           className="w-full max-w-[90%] md:max-w-[80%] h-auto rounded-lg shadow-lg"
//           autoPlay
//           loop
//           muted
//         >
//           <source
//             src="/assets/squat-animation.mp4" // Path to your local video file
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>
//       </div>

//       {/* Right Side: Webcam and Reps Counter */}
//       <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
//         {/* <h2 className="text-3xl md:text-4xl font-bold mb-4">Tracker</h2> */}
//         <div className="bg-[#4f1d5f] shadow-lg rounded-lg p-2 w-full max-w-[90%] md:max-w-[80%] text-center flex flex-col">
//           {/* ✅ Webcam now takes full width */}
//           <Webcam ref={webcamRef} className="w-full h-full object-cover rounded-lg" />
//         </div>
//         <p className="text-xl font-semibold mt-4">Count reps: {squatCount}</p>
//         <button
//           onClick={saveDataToBackend}
//           className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-500 hover:text-[#30093f] transition"
//         >
//           Save Progress
//         </button>
//       </div>
//     </div>
//   </div>
// </div>


//   );
// };

// export default Activity;


// import React, { useRef, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import Webcam from "react-webcam";
// import axios from "axios";

// const Activity = () => {
//   const { exercise } = useParams();
//   const navigate = useNavigate();
//   const webcamRef = useRef(null);
//   const [repCount, setRepCount] = useState(0);
//   const [feedback, setFeedback] = useState(`Start ${exercise}!`);

//   let dir = 0; // 0 = Down, 1 = Up

//   const challenge = JSON.parse(localStorage.getItem("activeChallenge"));
//   const challengeReps = challenge?.reps || null;
//   const challengePoints = challenge?.points || 0;
//   const isInChallenge = challenge?.title.includes(exercise);

//   useEffect(() => {
//     const runPoseDetection = async () => {
//       await tf.ready();
//       const detector = await posedetection.createDetector(
//         posedetection.SupportedModels.MoveNet,
//         { modelType: posedetection.movenet.modelType.SINGLEPOSE_THUNDER }
//       );

//       const detectPose = async () => {
//         if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//           const video = webcamRef.current.video;
//           const poses = await detector.estimatePoses(video);

//           if (poses.length > 0) {
//             const keypoints = poses[0].keypoints;
//             trackSquats(keypoints);
//           }
//         }
//         requestAnimationFrame(detectPose);
//       };

//       detectPose();
//     };

//     runPoseDetection();
//   }, [exercise]);

//   // ✅ Squat Detection (First Correct Version)
//   const trackSquats = (keypoints) => {
//     const leftHip = keypoints.find((p) => p.name === "left_hip");
//     const leftKnee = keypoints.find((p) => p.name === "left_knee");
//     const rightHip = keypoints.find((p) => p.name === "right_hip");
//     const rightKnee = keypoints.find((p) => p.name === "right_knee");

//     if (!leftHip || !leftKnee || !rightHip || !rightKnee) return;

//     const leftKneeAngle = calculateAngle(leftHip, leftKnee);
//     const rightKneeAngle = calculateAngle(rightHip, rightKnee);

//     if (leftKneeAngle < 100 && rightKneeAngle < 100) {
//       if (dir === 0) {
//         setFeedback("Squatting... Keep going!");
//         dir = 1;
//       }
//     } else if (leftKneeAngle > 150 && rightKneeAngle > 150) {
//       if (dir === 1) {
//         setRepCount((prev) => checkChallengeCompletion(prev + 1));
//         setFeedback("Great squat! Stand tall.");
//         dir = 0;
//       }
//     }
//   };

//   // ✅ Check Challenge Completion
//   const checkChallengeCompletion = async (newCount) => {
//     if (isInChallenge && newCount >= challengeReps) {
//       alert(`✅ Challenge Completed! +${challengePoints} Points 🎉`);
//       await saveDataToBackend(true);
//       localStorage.removeItem("activeChallenge");
//       navigate("/leaderboard");
//     }
//     return newCount;
//   };

//   // ✅ Helper: Calculate Angle
//   const calculateAngle = (point1, point2) => {
//     const dx = point2.x - point1.x;
//     const dy = point2.y - point1.y;
//     return Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <h2 className="text-2xl font-bold">{exercise} Tracker</h2>
//       <Webcam ref={webcamRef} className="w-full max-w-lg" />
//       <p className="mt-4 text-lg">{feedback}</p>
//       <p>{exercise} Count: {repCount}</p>
//       {isInChallenge && <p className="text-yellow-400">Challenge: {challengeReps} reps required!</p>}
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={() => saveDataToBackend(false)}
//       >
//         Save Progress
//       </button>
//     </div>
//   );
// };

// export default Activity;

