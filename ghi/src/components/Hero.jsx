import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";

const Hero = () => {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const location = useLocation();

  const handleShow = () => {
    setShow();
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      setShow(!show);
      setTimeout(() => {
        setRegister(false);
        setLogin(true);
        setShow(true);
      }, 375);
    } else if (location.pathname === "/register") {
      setShow(!show);
      setTimeout(() => {
        setLogin(true);
        setRegister(true);
        setShow(true);
      }, 375);
    } else {
      setShow(!show);
      setTimeout(() => {
        setLogin(false);
        setRegister(false);
        setShow(true);
      }, 375);
    }
  }, [location]);

  return (
    <>
      <div className="w-full h-screen bg">
        <div className="w-full h-screen">
          <div
            className={` flex justify-center items-center h-full ${
              login || register ? "max-w-[1800px]" : "max-w-[1260px]"
            }`}
          >
            <div
              className={`sm:mt-[-60px] mt-[-150px] transition duration-700 ${
                show
                  ? `translate-y-0 ease-in-out opacity-100 `
                  : `-translate-y-full ease-out opacity-0`
              }`}
            >
              {login ? (
                register ? (
                  <div className="max-w-[1260px] ml-20 mt-20 h-[100%] bg-[#fff] flex justify-center items-center rounded-md shadow-2xl">
                    <Register />
                  </div>
                ) : (
                  <div className="max-w-[1260px] ml-20 mt-20 h-[100%] bg-[#fff] flex justify-center items-center rounded-md shadow-2xl">
                    <Login />
                  </div>
                )
              ) : (
                <>
                  <h5 className="text-center font-bold" onClick={handleShow}>
                    HANGING OUT MADE EASY
                  </h5>
                  <h1 className="text-center pt-2 mt-[-10px]">
                    Meet<span className="text-white">Up</span>
                  </h1>
                  <h2 className="pb-1 text-center text-[#fff]">
                    Adulting gets <span className="text-[#000]">busy.</span>
                  </h2>
                  <h5 className="text-center text-black">
                    Organize your next hangout with tech
                  </h5>
                  <div className="flex justify-center">
                    <Link to="register">
                      <button className="py-2 px-4 my-3 bg-[#000] border-[#000] border-2 rounded-md shadow-xl font-semibold text-white text-lg hover:bg-[#4f5038] hover:border-[#4f5038] hover:ease-in transition duration-150">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
