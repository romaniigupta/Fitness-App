// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom"; // ✅ Import useParams
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import Webcam from "react-webcam";
// import axios from "axios";
// import DNavbar from "./DNavbar";
// import SDNavbar from "./SDNavbar";

// const Activity = () => {
//   const navigate = useNavigate();
//   const { exercise } = useParams();
//   const webcamRef = useRef(null);
//   const [squatCount, setSquatCount] = useState(0);
//   const [feedback, setFeedback] = useState("Stand straight to start");

//   let dir = 0;
 
//   const exerciseVideos = {
//     "Push-up": "/assets/push-up.mp4",
//     Squat: "/assets/squat-animation.mp4",
//     "Jumping-Jack": "/assets/jumping-jack.mp4",
//     Crunch: "/assets/crunch.mp4",
//     Lunge: "/assets/lunge.mp4",
//   };

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
  
//       // ✅ Map frontend exercise name to backend schema
//       const exerciseMapping = {
//         Squat: "squats",
//         "Push-up": "pushups",
//         "Jumping-Jack": "jumpingJacks",
//         Crunch: "crunches",
//         Lunge: "lunges",
//       };
  
//       const backendExercise = exerciseMapping[exercise];
  
//       if (!backendExercise) {
//         alert("Invalid exercise type.");
//         return;
//       }
  
//       const exerciseData = {
//         exercise: backendExercise, // ✅ Send correctly formatted name
//         reps: squatCount,
//         challengeCompleted: true,
//       };
  
//       await axios.post("http://localhost:3000/api/exercises", exerciseData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
  
//       alert("Exercise data saved!");
//       navigate("/leaderboard");
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
  



//   return (
//     <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
//       {/* ✅ Navbar */}
//       <DNavbar />

//       <div className="flex flex-1 w-full">
//         {/* ✅ Sidebar */}
//         <SDNavbar />

//         {/* ✅ Activity Content */}
//         <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 p-4">
//           {/* ✅ Left Side: Exercise Animation Video */}
//           <div className="w-full md:w-1/2 flex justify-center items-center">
//             <video
//               className="w-full max-w-[90%] md:max-w-[80%] h-auto rounded-lg shadow-lg"
//               autoPlay
//               loop
//               muted
//             >
//               <source
//                 src={exerciseVideos[exercise] || "/assets/default.mp4"} // ✅ Dynamic video selection
//                 type="video/mp4"
//               />
//               Your browser does not support the video tag.
//             </video>
//           </div>

//           {/* ✅ Right Side: Webcam and Reps Counter */}
//           <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
//             <h5 className="text-3xl md:text-4xl font-bold mb-4">{exercise} Tracker</h5>
//             <div className="bg-[#4f1d5f] shadow-lg rounded-lg p-2 w-full max-w-[90%] md:max-w-[80%] text-center flex flex-col">
//               <Webcam ref={webcamRef} className="w-full h-full object-cover rounded-lg" />
//             </div>
//             <p className="text-xl font-semibold mt-4">Count reps: {squatCount}</p>
//             <button
//               onClick={saveDataToBackend}
//               className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-yellow-500 hover:text-[#30093f] transition"
//             >
//               Save Progress
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Activity;


// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as tf from "@tensorflow/tfjs";
// import * as posedetection from "@tensorflow-models/pose-detection";
// import Webcam from "react-webcam";
// import axios from "axios";
// import DNavbar from "./DNavbar";
// import SDNavbar from "./SDNavbar";

// const Activity = () => {
//   const navigate = useNavigate();
//   const { exercise } = useParams();
//   const webcamRef = useRef(null);
//   const [repCount, setRepCount] = useState(0);
//   const [feedback, setFeedback] = useState("Get into position to start");

//   let dir = 0; // Direction of movement

//   // Exercise animation videos
//   const exerciseVideos = {
//     "Push-up": "/assets/push-up.mp4",
//     Squat: "/assets/squat-animation.mp4",
//     "Jumping-Jack": "/assets/jumping-jack.mp4",
//     Crunch: "/assets/crunch.mp4",
//     Lunge: "/assets/lunge.mp4",
//   };

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
//             handleExerciseDetection(keypoints);
//           }
//         }
//         requestAnimationFrame(detectPose);
//       };

//       detectPose();
//     };

//     runPoseDetection();
//   }, []);

//   // 🔥 Handles detection for all exercises dynamically
//   const handleExerciseDetection = (keypoints) => {
//     switch (exercise) {
//       case "Squat":
//         detectSquat(keypoints);
//         break;
//       case "Push-up":
//         detectPushUp(keypoints);
//         break;
//       case "Jumping-Jack":
//         detectJumpingJack(keypoints);
//         break;
//       case "Crunch":
//         detectCrunch(keypoints);
//         break;
//       case "Lunge":
//         detectLunge(keypoints);
//         break;
//       default:
//         console.log("Unknown exercise");
//     }
//   };

//   // ✅ Squat Detection
//   const detectSquat = (keypoints) => {
//     const leftHip = keypoints.find((point) => point.name === "left_hip");
//     const leftKnee = keypoints.find((point) => point.name === "left_knee");
//     const rightHip = keypoints.find((point) => point.name === "right_hip");
//     const rightKnee = keypoints.find((point) => point.name === "right_knee");

//     if (leftHip && leftKnee && rightHip && rightKnee) {
//       const leftKneeAngle = calculateAngle(leftHip, leftKnee);
//       const rightKneeAngle = calculateAngle(rightHip, rightKnee);

//       if (leftKneeAngle < 100 && rightKneeAngle < 100) {
//         if (dir === 0) {
//           setFeedback("Squatting... Keep going!");
//           dir = 1;
//         }
//       } else if (leftKneeAngle > 150 && rightKneeAngle > 150) {
//         if (dir === 1) {
//           setRepCount((prev) => prev + 1);
//           setFeedback("Great squat! Stand tall.");
//           dir = 0;
//         }
//       }
//     }
//   };

//   // ✅ Push-up Detection
//   const detectPushUp = (keypoints) => {
//     const leftElbow = keypoints.find((point) => point.name === "left_elbow");
//     const rightElbow = keypoints.find((point) => point.name === "right_elbow");

//     if (leftElbow && rightElbow) {
//       const elbowY = (leftElbow.y + rightElbow.y) / 2;
//       if (elbowY > 300 && dir === 0) {
//         setFeedback("Lowering... Keep going!");
//         dir = 1;
//       } else if (elbowY < 200 && dir === 1) {
//         setRepCount((prev) => prev + 1);
//         setFeedback("Great push-up!");
//         dir = 0;
//       }
//     }
//   };

//   // ✅ Jumping Jack Detection
//   const detectJumpingJack = (keypoints) => {
//     const leftWrist = keypoints.find((point) => point.name === "left_wrist");
//     const rightWrist = keypoints.find((point) => point.name === "right_wrist");

//     if (leftWrist && rightWrist) {
//       if (leftWrist.y < 100 && rightWrist.y < 100 && dir === 0) {
//         setFeedback("Jumping up!");
//         dir = 1;
//       } else if (leftWrist.y > 200 && rightWrist.y > 200 && dir === 1) {
//         setRepCount((prev) => prev + 1);
//         setFeedback("Good Jumping Jack!");
//         dir = 0;
//       }
//     }
//   };

//   // ✅ Crunch Detection
//   const detectCrunch = (keypoints) => {
//     const nose = keypoints.find((point) => point.name === "nose");
//     const leftKnee = keypoints.find((point) => point.name === "left_knee");

//     if (nose && leftKnee) {
//       if (nose.y > leftKnee.y - 30 && dir === 0) {
//         setFeedback("Crunching...");
//         dir = 1;
//       } else if (nose.y < leftKnee.y - 100 && dir === 1) {
//         setRepCount((prev) => prev + 1);
//         setFeedback("Great crunch!");
//         dir = 0;
//       }
//     }
//   };

//   // ✅ Lunge Detection
//   const detectLunge = (keypoints) => {
//     const leftHip = keypoints.find((point) => point.name === "left_hip");
//     const leftKnee = keypoints.find((point) => point.name === "left_knee");

//     if (leftHip && leftKnee) {
//       if (leftKnee.y > leftHip.y + 50 && dir === 0) {
//         setFeedback("Lunging...");
//         dir = 1;
//       } else if (leftKnee.y < leftHip.y && dir === 1) {
//         setRepCount((prev) => prev + 1);
//         setFeedback("Great lunge!");
//         dir = 0;
//       }
//     }
//   };

//   const calculateAngle = (a, b) => {
//     const dx = b.x - a.x;
//     const dy = b.y - a.y;
//     return Math.abs(Math.atan2(dy, dx) * (180 / Math.PI));
//   };

//   return (
//     <div>
//       <DNavbar />
//       <SDNavbar />
//       <h2>{exercise} Tracker</h2>
//       <Webcam ref={webcamRef} />
//       <p>{feedback}</p>
//       <p>Reps: {repCount}</p>
//     </div>
//   );
// };

// export default Activity;


import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import Webcam from "react-webcam";
import axios from "axios";
import DNavbar from "./DNavbar";
import SDNavbar from "./SDNavbar";

const Activity = () => {
  const navigate = useNavigate();
  const { exercise } = useParams();
  const webcamRef = useRef(null);
  const [repCount, setRepCount] = useState(0);
  const [feedback, setFeedback] = useState("Get into position to start");

  let dir = 0; // Direction of movement

  // Exercise animation videos
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
            handleExerciseDetection(keypoints);
          }
        }
        requestAnimationFrame(detectPose);
      };

      detectPose();
    };

    runPoseDetection();
  }, []);

  // 🔥 Handles detection for all exercises dynamically
  const handleExerciseDetection = (keypoints) => {
    switch (exercise) {
      case "Squat":
        detectSquat(keypoints);
        break;
      case "Push-up":
        detectPushUp(keypoints);
        break;
      case "Jumping-Jack":
        detectJumpingJack(keypoints);
        break;
      case "Crunch":
        detectCrunch(keypoints);
        break;
      case "Lunge":
        detectLunge(keypoints);
        break;
      default:
        console.log("Unknown exercise");
    }
  };

  // ✅ Squat Detection
  const detectSquat = (keypoints) => {
    const leftHip = keypoints.find((point) => point.name === "left_hip");
    const leftKnee = keypoints.find((point) => point.name === "left_knee");
    const rightHip = keypoints.find((point) => point.name === "right_hip");
    const rightKnee = keypoints.find((point) => point.name === "right_knee");

    if (leftHip && leftKnee && rightHip && rightKnee) {
      const leftKneeAngle = calculateAngle(leftHip, leftKnee);
      const rightKneeAngle = calculateAngle(rightHip, rightKnee);

      if (leftKneeAngle < 100 && rightKneeAngle < 100) {
        if (dir === 0) {
          setFeedback("Squatting... Keep going!");
          dir = 1;
        }
      } else if (leftKneeAngle > 150 && rightKneeAngle > 150) {
        if (dir === 1) {
          setRepCount((prev) => prev + 1);
          setFeedback("Great squat! Stand tall.");
          dir = 0;
        }
      }
    }
  };

  // ✅ Push-up Detection
  const detectPushUp = (keypoints) => {
    const leftElbow = keypoints.find((point) => point.name === "left_elbow");
    const rightElbow = keypoints.find((point) => point.name === "right_elbow");

    if (leftElbow && rightElbow) {
      const elbowY = (leftElbow.y + rightElbow.y) / 2;
      if (elbowY > 300 && dir === 0) {
        setFeedback("Lowering... Keep going!");
        dir = 1;
      } else if (elbowY < 200 && dir === 1) {
        setRepCount((prev) => prev + 1);
        setFeedback("Great push-up!");
        dir = 0;
      }
    }
  };

  // ✅ Jumping Jack Detection
  const detectJumpingJack = (keypoints) => {
    const leftWrist = keypoints.find((point) => point.name === "left_wrist");
    const rightWrist = keypoints.find((point) => point.name === "right_wrist");

    if (leftWrist && rightWrist) {
      if (leftWrist.y < 100 && rightWrist.y < 100 && dir === 0) {
        setFeedback("Jumping up!");
        dir = 1;
      } else if (leftWrist.y > 200 && rightWrist.y > 200 && dir === 1) {
        setRepCount((prev) => prev + 1);
        setFeedback("Good Jumping Jack!");
        dir = 0;
      }
    }
  };

  // ✅ Crunch Detection
  const detectCrunch = (keypoints) => {
    const nose = keypoints.find((point) => point.name === "nose");
    const leftKnee = keypoints.find((point) => point.name === "left_knee");

    if (nose && leftKnee) {
      if (nose.y > leftKnee.y - 30 && dir === 0) {
        setFeedback("Crunching...");
        dir = 1;
      } else if (nose.y < leftKnee.y - 100 && dir === 1) {
        setRepCount((prev) => prev + 1);
        setFeedback("Great crunch!");
        dir = 0;
      }
    }
  };

  // ✅ Lunge Detection
  const detectLunge = (keypoints) => {
    const leftKnee = keypoints.find((point) => point.name === "left_knee");
    const rightKnee = keypoints.find((point) => point.name === "right_knee");

    if (leftKnee && rightKnee) {
      if (leftKnee.y < rightKnee.y && dir === 0) {
        setFeedback("Lunging...");
        dir = 1;
      } else if (leftKnee.y > rightKnee.y && dir === 1) {
        setRepCount((prev) => prev + 1);
        setFeedback("Good Lunge!");
        dir = 0;
      }
    }
  };

  // ✅ Calculate angle for squat detection
  const calculateAngle = (hip, knee) => {
    const dx = knee.x - hip.x;
    const dy = knee.y - hip.y;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    return Math.abs(angle);
  };

  // Save exercise data to backend
  const saveDataToBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        return;
      }

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
        exercise: backendExercise,
        reps: repCount,
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

  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      <DNavbar />
      <div className="flex flex-1 w-full">
        <SDNavbar />
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6 p-4">
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <video
              className="w-full max-w-[90%] md:max-w-[80%] h-auto rounded-lg shadow-lg"
              autoPlay
              loop
              muted
            >
              <source
                src={exerciseVideos[exercise] || "/assets/default.mp4"}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center">
            <h5 className="text-3xl md:text-4xl font-bold mb-4">{exercise} Tracker</h5>
            <div className="bg-[#4f1d5f] shadow-lg rounded-lg p-2 w-full max-w-[90%] md:max-w-[80%] text-center flex flex-col">
              <Webcam ref={webcamRef} className="w-full h-full object-cover" />
              <h6 className="mt-4 text-2xl">{feedback}</h6>
              <p className="text-xl mt-2">Reps Completed: {repCount}</p>
            </div>
            <button
              onClick={saveDataToBackend}
              className="mt-6 px-8 py-3 text-xl bg-[#9c1b3f] text-white font-semibold rounded-lg"
            >
              Save Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;
