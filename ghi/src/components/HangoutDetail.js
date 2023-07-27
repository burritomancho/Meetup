import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logged from "./Logged";
import detailbackground from "../images/detailbackground.jpg";
import useToken from "@galvanize-inc/jwtdown-for-react";
import locationpin from "../images/locationpin.png"
import calendar from "../images/deadline.png"
import friends from "../images/friendshangoutdetail.jpg"
import { BsPencilSquare } from 'react-icons/bs'

export default function HangoutDetail() {
  const [user, setUser] = useState('')
  const { hangoutName } = useParams();
  const [hangout, setHangout] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDateForm, setShowDateForm] = useState('false')
  const [finalDate, setFinalDate] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const {token} = useToken();
  const navigate = useNavigate();
  // const [isChecked, setisChecked] = useState(false);
  useEffect(() => {
    if (!token) {
    navigate("/login")
  }
  })


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
      setShowConfirmation(true);
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        name: hangoutName,
        body: JSON.stringify(updatedHangout),
      });
  };

  const handleFinalDateChange = (event) => setFinalDate(event.target.value);

  const handleFinalDateSelection = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutName}`;
      const updatedHangout = {
        ...hangout,
        finalized_date: finalDate,
      }
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        name: hangoutName,
        body: JSON.stringify(updatedHangout),
      });
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

  useEffect(() => {
    const fetchPreferredDate = async () => {
      const selectedDatesCount = {};
      let mostSelectedDate = 'bruh';
      let highestOccurrence = 0;
      const theHangout = hangout
      hangout.friends.map((friend) => {
        if (!selectedDatesCount[friend["selected_date"]]) {
          selectedDatesCount[friend["selected_date"]] = 1
        } else {
          selectedDatesCount[friend["selected_date"]] ++
        }
      });

      for (const date in selectedDatesCount) {
        if (selectedDatesCount[date] > highestOccurrence) {
          highestOccurrence = selectedDatesCount[date];
          mostSelectedDate = date;
        }
      }
      setPreferredDate(mostSelectedDate)
    }
    fetchPreferredDate()
  }, [hangout])


  if (!hangout) {
    return (
      <div className="text-center pt-16 text-xl font-bold">
        No existing Hangout
      </div>
    );
  }

  // useEffect(() => {
  //   const handlePreferredDate = (async () => {

  //   })
  // }, [hangout])

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
    <div
      className="min-h-screen items-center justify-center"
      // style={{
      //   backgroundImage: `url(${Calendar})`,
      //   backgroundPositionX: "20%",
      // }}
    >
      <div>
        <img className="absolute inset-0 w-full h-[25vh] lg:h-[35vh] md:h-[30vh] object-cover" src={detailbackground} />
      </div>
      <div className="h-full w-full w-[1/2] pb-[5%] transition-all relative">
        {showConfirmation && (
          <div className="confirmation-modal bg-white p-6 rounded-lg">
            <div className="confirmation-content mx-auto">
              <h3 style={{ textAlign: "center" }}>Thank you for selecting!</h3>
              <p className="mt-4" style={{ textAlign: "center" }}>Your preferred meetup date was updated successfully.</p>
              <div className="flex justify-center pt-8">
                <button className="pr-4 pl-4 pt-2 pb-2 rounded-lg" onClick={closeConfirmation} style={{ backgroundColor: "blue", color: "white" }} >Close</button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap justify-center mt-[15%]">
          <div className="lg:w-[30%] lg:rounded-r-none lg:ml-0 md:w-[700px] md:rounded-l-2xl md:ml-[10%] sm:w-[500px] rounded-r-2xl rounded-l-2xl sm:rounded-l-2xl ml-[10%] lg:rounded-l-2xl w-[300px] h-96 py-4 bg-white shadow-2xl p-12">
            <h3 className="pt-2 pb-4">{hangout.name}</h3>
            <div className="border-t border-gray-400"></div>
            <div className="flex flex-row items-center pt-6">
              <img src={locationpin} height={"40px"} width={"40px"}></img>
              <h5 className="pl-2 text-gray-400">Location</h5>
            </div>
            <h4 className="pt-2 pl-2 text-cyan-600" >{hangout.location}</h4>
            <div className="flex flex-row items-center pt-10">
              <img className="pl-2" src={calendar} height={"40px"} width={"40px"}></img>
              <h5 className="pl-2 text-gray-400">Finalized Date</h5>
            </div>
            <div className="flex flex-wrap">
            <h5 className="pt-2 pl-2 text-gray-500">{hangout.finalized_date}</h5>
            {user.username === hangout.host && (
              <div>
              <button className="rounded-xl bg-blue p-4" onClick={() => setShowDateForm(true)}>
                <BsPencilSquare />
              </button>
                {showDateForm === true && (
                <form>
                  <input className="border-2 border-black mr-4" id="finaldate" name="finaldate" type="date" placeholder="New date" value={finalDate} onChange={handleFinalDateChange} />
                    <button className="p-2" style={{ backgroundColor: 'blue', borderRadius: '10px', color: 'white', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = 0.5} onMouseLeave={(e) => e.target.style.opacity = 1} onClick={() => handleFinalDateSelection(finalDate)}>Confirm?</button>
                </form>)}
              </div>
            )}
            </div>
          </div>
          <div className="max-h-full p-8 rounded-r-2xl lg:rounded-l-none lg:border-1 lg:border-dotted lg:border-gray-400 lg:border-2 bg-indigo-200 lg:w-[30%] lg:ml-[0%] md:w-[700px] md:rounded-l-2xl sm:w-[500px] w-[300px] sm:rounded-l-2xl rounded-l-2xl ml-[10%] py-4 font-bold bg-white text-lg shadow-2xl">
            <div>
              <h3 className="font-bold text-blue-800 text-4xl mb-4">Can't make it?</h3>
              <div className="text-gray-600 text-base mb-4">
                Set your preferred date for the host to see:
              </div>
              <div className="border-t border-gray-400 "/>
              <div className="flex flex-wrap">
                <div>
                  {hangout.dates.map((date) => (
                    <div key={date} className="flex items-center">
                      <input
                        type="checkbox"
                        className="checkbox mr-4 mt-4 h-4 w-4"
                        checked={selectDate === date}
                        onChange={() => setSelectDate(date)}
                      />
                      <span className={`text-lg ${selectDate === date ? 'text-indigo-500' : 'text-gray-600'} mt-4`}>
                        {date}
                      </span>
                      {selectDate === date && (
                        <button
                          onClick={() => handleDateSelection()}
                          className="ml-4 mt-4 px-4 py-2 text-lg text-white bg-gradient-to-br from-yellow-400 via-pink-500 to-red-500 hover:bg-indigo-600 rounded-lg"
                          disabled={hangout.host === user.username}
                        >
                          <span>Confirm?</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 mx-auto">
                  <div>Most preferred date:</div>
                  <div className="rounded-xl border-2 border-blue text-center">{preferredDate}</div>
                </div>
            </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-full w-9/10 pl-[8%] pr-[8%]">
          <div className="min-h-[400px] lg:ml-[5%] md:ml-[5%] sm:ml-[5%] ml-[15%] lg:w-[50%] md:w-[400px] md:items-center sm:items-center sm:w-[200px] my-5 rounded-md pl-4 h-[90px] pt-4 mt-[8%]">
            <h3 className="text-gray-600">Event Notes:</h3>
            <p className="pt-2 font-normal text-base">
              {hangout.notes}
            </p>
          </div>
          <div className="lg:w-[400px] md:w-[350px] sm:w-[300px] w-[200px] p-12 rounded-2xl shadow-2xl ml-auto mt-[5%] bg-white border-2 border-black">
            <div className="flex flex-wrap items-center">
              <img className="rounded-full" src={friends} height={"80px"} width={"80px"}></img>
              <div className="flex flex-col">
                <span className="text-gray-400 font-bold lg:text-xl md:text-xl sm:text-xl text-sm ml-4">Friends</span>
                <span className="font-extrabold ml-4 text-2xl text-gray-600">Who's invited:</span>
              </div>
            </div>
            <div className="mt-8">
            {hangout.friends.map((friend) => (
              <div
                key={friend.username}
                className="pt-2 flex justify-start text-base font-bold text-lg"
              >
                <li>{capitalizeFirstLetter(friend.username)}</li>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Logged className="z-20" />
    </>
  );
}
