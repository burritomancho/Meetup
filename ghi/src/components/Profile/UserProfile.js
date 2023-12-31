import { useState, useEffect } from "react";
import Logged from "../Logged";
import { useNavigate, Link } from "react-router-dom";
import Cover from "../../assets/register.jpg";

const hangoutImages = [
  require("../../assets/hangouts/arcade.jpg"),
  require("../../assets/hangouts/background2.jpg"),
  require("../../assets/hangouts/background3.jpg"),
  require("../../assets/hangouts/beach.jpg"),
  require("../../assets/hangouts/biking.jpg"),
  require("../../assets/hangouts/calendar1.jpg"),
  require("../../assets/hangouts/calendar2.jpg"),
  require("../../assets/hangouts/camping.jpg"),
  require("../../assets/hangouts/chat.jpg"),
  require("../../assets/hangouts/climbing.jpg"),
  require("../../assets/hangouts/coffee2.jpg"),
  require("../../assets/hangouts/fireplace.jpg"),
  require("../../assets/hangouts/food.jpg"),
  require("../../assets/hangouts/friends.jpg"),
  require("../../assets/hangouts/golfing.jpg"),
  require("../../assets/hangouts/hands.jpg"),
  require("../../assets/hangouts/hiking.jpg"),
  require("../../assets/hangouts/movie.jpg"),
  require("../../assets/hangouts/ocean.jpg"),
  require("../../assets/hangouts/picnic.jpg"),
  require("../../assets/hangouts/pool.jpg"),
  require("../../assets/hangouts/restaurant.jpg"),
  require("../../assets/hangouts/snorkel.jpg"),
  require("../../assets/hangouts/soccer.jpg"),
  require("../../assets/hangouts/surf.jpg"),
  require("../../assets/hangouts/tennis.jpg"),
  require("../../assets/hangouts/wine.jpg"),
  require("../../assets/hangouts/travel.jpg"),
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [hangouts, setHangouts] = useState([]);
  const [hangoutImagesIndex, setHangoutImagesIndex] = useState([]);

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
  }, []);

  const fetchHangouts = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users/${user.username}/hangouts`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setHangouts(data);
    }
  };

  useEffect(() => {
    fetchHangouts();
  }, [user]);

  const capitalizeFirstLetter = (string) => {
    if (string && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  useEffect(() => {
    if (hangouts.length > 0) {
      const randomIndices = hangouts.map(() =>
        Math.floor(Math.random() * hangoutImages.length)
      );
      setHangoutImagesIndex(randomIndices);
    }
  }, [hangouts]);

  const changeCoverImage = (index) => {
    setHangoutImagesIndex((prevIndex) => {
      const updatedIndex = [...prevIndex];
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * hangoutImages.length);
      } while (newIndex === updatedIndex[index]);
      updatedIndex[index] = newIndex;
      return updatedIndex;
    });
  };

  const handleEditProfile = () => {
    navigate("/editprofile")
  }

  return (
    <>
      <div className="bg-[#60614b] w-full lg:px-20 md:px-20 sm:px-16 px-12 pt-16">
        <div className="font-semibold ml-16 mx-auto">
          <div
            className="bg-center bg-no-repeat bg-cover pt-32"
            style={{
              backgroundImage: `url(${Cover})`,
              backgroundPositionY: "55%",
            }}
          >
            <div className="flex justify-end absolute top-[50px] lg:right-[100px] md:right-[95px] sm:right-[80px] right-[70px] transition-all">
              <button
                onClick={handleEditProfile}
                className="mt-8 py-2 px-4 bg-[#575757] hover:bg-[#484848] text-white font-normal rounded-lg"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative rounded-full bg-gray-50 overflow-hidden">
                <img
                  className="lg:h-52 lg:w-52 md:h-44 md:w-44 sm:h-40 sm:w-40 w-32 h-32 object-cover"
                  src={user.picture}
                  alt=""
                />
              </div>
            </div>
            <div className="text-gray-50 font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center pt-3 pb-16">
              {capitalizeFirstLetter(user.username)}
            </div>
          </div>
          <div className="grid grid-cols-12 min-h-screen lg:pb-40 md:pb-44 sm:pb-60 pb-72 transition-all">
            <div className="col-span-4 bg-[#D1D4C9] py-16 xl:pl-14 lg:pl-12 md:pl-10 sm:pl-6 pl-2 transition-all">
              <div className="lg:text-2xl md:text-xl sm:text-lg text-md pb-8 sm:mr-10 ml-1 mr-2 border-b-2 border-black">
                User Info:
              </div>
              <div className="lg:text-lg md:text-lg sm:text-md text-md">
                <div className="pt-4 grid items-end sm:grid-cols-3 grid-cols-1">
                  Email:
                  <div className="sm:text-base text-sm sm:ml-4 font-normal whitespace-nowrap">
                    {capitalizeFirstLetter(user.email)}
                  </div>
                </div>
                <div className="mt-16">
                  Friends:
                  <div className="sm:mr-10 mr-2 mt-2 grid sm:grid-cols-2 grid-cols-1 gap-1">
                    {user.friends &&
                      user.friends.map((friend) => (
                        <div
                          key={friend}
                          className="hover:bg-slate-200 py-2 px-3 sm:w-full text-center sm:text-base text-sm border-2 border-black capitalize font-normal whitespace-nowrap mb-2"
                        >
                          {friend}
                        </div>
                      ))}
                  </div>{" "}
                </div>
              </div>
            </div>
            <div className="text-gray-50 col-span-8 bg-[#57837B] pl-10 py-16 transition-all">
              <p className="lg:text-2xl md:text-xl sm:text-lg text-md pb-8 mr-10 border-b-2">
                Active Hangouts: {hangouts.length}
              </p>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {hangouts.map((hangout, index) => (
                  <div
                    key={hangout.name}
                    className="flex items-center justify-center pr-10"
                  >
                    <div
                      className="mt-16 mx-auto bg-neutral-200 text-gray-950 font-semi-bold rounded-lg flex flex-col items-center justify-center w-full h-full relative"
                      onClick={() => changeCoverImage(index)}
                    >
                      <div className="w-full h-36">
                        <div
                          className="h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${
                              hangoutImages[hangoutImagesIndex[index]]
                            })`,
                          }}
                        ></div>
                      </div>
                      <Link
                        to={`/hangouts/${hangout.name}`}
                        title="Details"
                        className="flex items-center justify-center xl:text-xl lg:text-xl md:text-lg sm:text-base text-base mt-2 hover:scale-110 duration-200"
                      >
                        {capitalizeFirstLetter(hangout.name)}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Logged />
    </>
  );
}
