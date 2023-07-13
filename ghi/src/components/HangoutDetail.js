import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logged from "./Logged";
import Calendar from "../assets/calendar1.jpg";

export default function HangoutDetail() {
  const [user, setUser] = useState('')
  const { hangoutName } = useParams();
  const [hangout, setHangout] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [isChecked, setisChecked] = useState(false);

  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.account);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [])

  const handleDateSelection = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutName}`;
      const updatedHangout = {
        ...hangout,
        friends: hangout.friends.map((friend) => {
          if (friend.username === user.username) {
            return {
              ...friend,
              selected_date: selectDate,
            };
          }
          return friend;
        })
      }

      const putConfig = {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      }
      const response = await fetch(url, putConfig,
        body: JSON.stringify(updatedHangout),
      );
      if (response.ok) {
        setShowConfirmation(true);
      }
  };

  const closeConfirmation = (() => {
    setShowConfirmation(false);
  })

  useEffect(() => {
    const fetchHangout = async () => {
      try {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutName}`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setHangout(data);
        } else {
          console.error("Failed to fetch hangout details");
        }
      } catch (error) {
        console.error("Failed to fetch hangout details", error);
      }
    };
    fetchHangout();
  }, [hangoutName]);

  if (!hangout) {
    return (
      <div className="text-center pt-16 text-xl font-bold">
        No existing Hangout
      </div>
    );
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className="bg-center bg-no-repeat bg-cover w-full min-h-screen"
      style={{
        backgroundImage: `url(${Calendar})`,
        backgroundPositionX: "20%",
      }}
    >
      <div className="max-w-[860px] h-full mx-auto pl-12 transition-all pb-16">
        <h3 className="text-center pt-28 text-gray-50 lg:text-6xl md:text-5xl sm:text-4xl text-4xl">
          {capitalizeFirstLetter(hangout.name)}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-12">
          <div className="lg:w-[100%] md:w-[90%] sm:w-[85%] w-[70%] mx-auto rounded-md h-96 py-4 bg-[#feffcc] text-lg">
            <div className="pl-4 font-bold">
              Possible Dates:
              {hangout.dates.map((date) => (
                <div key={date}>
                  <input
                    type="checkbox"
                    className="checkbox mr-4 h-4 w-4"
                    onChange={() => setSelectDate(date)}
                  />
                    <span>{date}</span>
                    {selectDate && (
                      <button
                        onClick={() => handleDateSelection()}
                        className="mt-4 ml-4 px-4 py-2 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg">
                          <span>Confirm?</span>
                      </button>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[100%] md:w-[90%] sm:w-[85%] w-[70%] mx-auto rounded-md py-4 font-bold bg-[#feffcc] text-lg">
            <div className="pl-4">
              Attendees:
              {hangout.friends.map((friend) => (
                <div
                  key={friend.username}
                  className="pt-2 flex justify-start text-base font-normal"
                >
                  <li>{capitalizeFirstLetter(friend.username)}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-[100%] md:w-[90%] sm:w-[85%] w-[70%] mx-auto my-5 rounded-md pl-4 h-[90px] pt-4 font-bold bg-[#feffcc] text-lg">
          Selected Location:
          <p className="pt-2 font-normal text-base">
            {capitalizeFirstLetter(hangout.location)}
          </p>
        </div>
        <div className="lg:w-[100%] md:w-[90%] sm:w-[85%] w-[70%] mx-auto rounded-md pl-4 h-[90px] pt-4 font-bold bg-[#feffcc] text-lg">
          Hangout notes:{" "}
          <p className="pt-2 font-normal text-base">
            {capitalizeFirstLetter(hangout.description)}
          </p>
        </div>
        <div className="lg:w-[100%] md:w-[90%] sm:w-[85%] w-[70%] mx-auto my-5 rounded-md pl-4 h-[90px] pt-4 font-bold bg-[#feffcc] text-lg">
          Finalized Date:{" "}
          <p className="pt-2 font-normal text-base">
            {capitalizeFirstLetter(hangout.finalized_date)}
          </p>
        </div>
      </div>
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h2>Confirmation</h2>
            <p>The hangout has been updated successfully.</p>
            <button onClick={closeConfirmation}>Close</button>
          </div>
        </div>
      )}
      <Logged />
    </div>
  );
}
