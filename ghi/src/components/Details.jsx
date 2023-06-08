import React from "react";
import Logged from "./Logged";

function Details() {
  return (
    <>
      <div className="w-full h-screen">
        <div className="max-w-[860px] h-full mx-auto">
          <h3 className="text-center pt-10">[MeetUp Name]</h3>
          <div className="">
            <div>
              <div className="flex justify-center gap-7 mt-10">
                <div className="py-40 px-64 rounded-md border-black border">
                  calendar
                </div>
                <div className="p-20 rounded-md border-black border">
                  attendees
                </div>
              </div>
              <div className="w-[97%] mx-auto my-5 py-3 text-center border-black rounded-md border">
                location
              </div>
              <div className="w-[97%] mx-auto py-28 px-56 border-black border rounded-md">
                notes
              </div>
            </div>
          </div>
        </div>
        <Logged />
      </div>
    </>
  );
}

export default Details;
