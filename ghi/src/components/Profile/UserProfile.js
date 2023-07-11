import { useState, useEffect } from "react";
import Logged from "../Logged";
import Profile from "../../assets/profile3.png";
import { Link, useParams } from "react-router-dom";

export default function UserProfile() {
  const { hangoutName } = useParams();
  const [user, setUser] = useState("");
  const [hangouts, setHangouts] = useState([]);
  const [hangout, setHangout] = useState(null);

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

  const capitalizeFirstLetter = (string) => {
    if (string && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  return (
    <>
      <div className="bg-gray-900 w-full lg:px-20 md:px-20 sm:px-16 px-12 min-h-screen">
        <div className="font-semibold">
          <div className="w-full flex items-center justify-center pt-32 pl-14">
            <div className="rounded-full bg-gray-50">
              <img
                className="lg:h-52 lg:w-52 md:h-44 md:w-44 sm:h-40 sm:w-40 w-32 h-32 overflow-hidden"
                src={Profile}
                alt=""
              />
            </div>
          </div>
          <div className="text-gray-50 font-bold lg:text-4xl md:text-3xl sm:text-2xl text-xl text-center pt-3 pb-16 pl-12">
            {capitalizeFirstLetter(user.username)}
          </div>
          <div className="grid grid-cols-12 min-h-screen pl-16 lg:pb-40 md:pb-44 sm:pb-60 pb-72 transition-all">
            <div className="col-span-4 bg-[#D1D4C9] py-16 text-center">
              <p className="lg:text-xl md:text-lg sm:text-base text-base pb-8">
                Either... <br />
                Info or Friends:
              </p>
            </div>
            <div className="text-gray-50 col-span-8 bg-[#29435C] pl-10 py-16">
              <p className="lg:text-xl md:text-lg sm:text-base text-base pb-8">
                Active hangouts:
              </p>
              <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {hangouts.map((hangout) => (
                  <div
                    key={hangout.name}
                    className="flex items-center justify-center pr-10"
                  >
                    <Link
                      to={`/hangouts/${hangout.name}`}
                      className="mt-6 mx-auto bg-neutral-300 text-gray-950 font-semi-bold rounded-lg flex items-center justify-center w-full xl:h-40 lg:h-34 md:h-32 sm:h-30 h-24 hover:scale-105 duration-300"
                    >
                      <span className="flex items-center justify-center lg:text-xl md:text-lg sm:text-base text-base">
                        {capitalizeFirstLetter(hangout.name)}
                      </span>
                    </Link>
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
