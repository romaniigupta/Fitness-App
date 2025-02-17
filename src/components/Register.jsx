import React from "react";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SNavbar from "./SNavbar";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let response = await fetch(
        // "https://mern-fitness-app-production-e9fe.up.railway.app/register",
        "http://localhost:3000/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        alert("Registeration Successful");
        navigate("/signin");
      } else if (response.status === 503) {
        setError("email", {
          type: "server",
          message: "This email already exists",
        });
      }
    } catch (error) {
      alert("Oops! There occured an problem");
    }
  };

  return (
    <div className="h-screen bg-[#30093f] p-0 m-0 flex flex-col items-center font-dm-sans">
      <Navbar />
      <div className="flex max-md:w-screen">
        <SNavbar></SNavbar>
        <div className="w-screen flex flex-col items-center">
          <div className="text-2xl text-center mt-[5vh] text-yellow-400 font-dm-sans">
            Register yourself
          </div>
          <div className="w-[50vw] h-96 bg-[#1f0729] mt-8 rounded-3xl max-md:w-[80vw]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center text-sm h-[100%]"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-80 max-md:text-[9px] h-6 max-md:w-44 max-md:h-5 outline-none rounded-md text-center border-[2px] m-5 max-lg:w-60 max-lg:text-[10px] ${
                    errors.email ? "border-red-600" : "border-transparent"
                  }`}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-600  absolute top-12 max-md:top-10 max-md:text-[8px] left-[50%] text-xs -translate-x-1/2">
                    {errors.email.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`w-80 max-md:text-[9px] h-6 max-md:w-44 max-md:h-5 outline-none rounded-md text-center border-[2px] m-5 max-lg:w-60 max-lg:text-[10px] ${
                    errors.password ? "border-red-600" : "border-transparent"
                  }`}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    minLength: {
                      value: 8,
                      message: "At least 8 characters are required",
                    },
                  })}
                />
                {errors.password && (
                  <div className="text-red-600  absolute top-12 max-md:top-10 max-md:text-[8px] left-[50%] text-xs -translate-x-1/2">
                    {errors.password.message}
                  </div>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  className={`w-80 max-md:text-[9px] h-6 max-md:w-44 max-md:h-5 outline-none rounded-md text-center border-[2px] m-5 max-lg:w-60 max-lg:text-[10px]${
                    errors.repassword ? "border-red-600" : "border-transparent"
                  }`}
                  {...register("repassword", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                />
                {errors.repassword && (
                  <div className="text-red-600  absolute top-12 max-md:top-10 max-md:text-[8px] left-[50%] text-xs -translate-x-1/2">
                    {errors.repassword.message}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="flex justify-center max-lg:text-[11px] max-lg:w-13 max-lg:h-4 items-center bg-yellow-400 max-md:w-14 max-md:h-3 text-xs max-md:text-[7px] w-28 font-semibold h-5 rounded-2xl m-5 max-md:m-1  hover:bg-white hover:text-black"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
