import React, { useState, useEffect } from "react";

const Hero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  });

  return (
    <>
      <div className="w-full h-screen bg">
        <div className="w-full h-screen">
          <div className="max-w-[1260px] flex justify-center items-center h-full">
            <div
              className={`sm:mt-[-60px] mt-[-150px] transition duration-1000 ${
                show
                  ? `translate-y-0 ease-in-out opacity-100 `
                  : `-translate-y-full ease-out opacity-0`
              }`}
            >
              <h5 className="text-center font-bold">HANGING OUT MADE EASY</h5>
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
                <button className="py-2 px-4 my-3 bg-[#000] border-[#000] border-2 rounded-md shadow-xl font-semibold text-white text-lg hover:bg-[#4f5038] hover:border-[#4f5038] hover:ease-in transition duration-150">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
