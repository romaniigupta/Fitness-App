import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DNavbar from "./DNavbar";
import SDNavbar from "./SDNavbar";

const challenges = [
  { id: "squats50", title: "50 Squats", reps: 50, points: 10 },
  { id: "pushups100", title: "100 Push-Ups", reps: 100, points: 20 },
  { id: "jumpingjacks300", title: "300 Jumping Jacks", reps: 3, points: 30 },
  { id: "lunges200", title: "200 Lunges", reps: 200, points: 25 },
  { id: "crunches150", title: "150 Crunches", reps: 150, points: 15 },
];

const Challenges = () => {
  const navigate = useNavigate();
  const [activeChallenge, setActiveChallenge] = useState(null);

  // ✅ Load active challenge (if exists)
  useEffect(() => {
    const storedChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
    if (storedChallenge) {
      setActiveChallenge(storedChallenge);
    }
  }, []);

  // ✅ Start a new challenge
  const joinChallenge = (challenge) => {
    setActiveChallenge(challenge);
    localStorage.setItem("activeChallenge", JSON.stringify(challenge));
    navigate(`/activity/${challenge.title.split(" ")[1]}`);
  };

  // ✅ Cancel the current challenge
  const cancelChallenge = () => {
    localStorage.removeItem("activeChallenge");
    setActiveChallenge(null);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#30093f] text-white font-dm-sans">
      <DNavbar />
      <div className="flex flex-1 w-full">
        <SDNavbar />
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-bold mt-6 text-yellow-400">
            🔥 Fitness Challenges
          </h2>

          {/* ✅ If a challenge is active, show it */}
          {activeChallenge ? (
            <div className="w-3/4 max-w-4xl bg-[#1f0729] rounded-lg p-5 mt-5 text-center">
              <h3 className="text-lg font-bold text-yellow-400">
                Ongoing Challenge: {activeChallenge.title}
              </h3>
              <p className="text-white">Complete {activeChallenge.reps} reps!</p>
              <button
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={cancelChallenge}
              >
                Cancel Challenge
              </button>
            </div>
          ) : (
            // ✅ Show available challenges if no active one
            <div className="w-3/4 max-w-4xl bg-[#1f0729] rounded-lg p-5 mt-5 overflow-x-auto">
              {challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className={`w-full md:w-3/4 lg:w-1/2 p-4 mb-3 rounded-lg 
                    text-lg font-bold cursor-pointer text-center transition-all
                    ${
                      activeChallenge?.id === challenge.id
                        ? "bg-yellow-400 text-[#30093f]"
                        : "bg-white text-black hover:bg-yellow-400 hover:text-[#30093f]"
                    }`}
                  onClick={() => joinChallenge(challenge)}
                >
                  {challenge.title} 🏅 (+{challenge.points} pts)
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
