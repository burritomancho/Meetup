import { useState, useEffect } from "react";
import Logged from "../Logged";
import Profile from "../../assets/profile3.png";

export default function UserProfile() {
  const [user, setUser] = useState("");
  const [hangouts, setHangouts] = useState([]);

  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.account);
      console.log(user);
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
  }, [fetchHangouts]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
          <div className="text-gray-50 font-bold text-4xl text-center pt-3 pb-16 pl-12">
            {user.username}
          </div>
          <div className="grid grid-cols-12 min-h-screen pl-16 lg:pb-40 md:pb-44 sm:pb-60 pb-72 transition-all">
            <div className="col-span-4 bg-[#D1D4C9] py-16 text-center">
              <p className="text-xl pb-4">Info or Friends:</p>
            </div>
            <div className="text-gray-50 col-span-8 bg-[#29435C] pl-10 py-16">
              <p className="text-xl pb-4">Active hangouts:</p>
              {hangouts.map((hangout) => (
                <div key={hangout.name}>
                  <li>{hangout.name}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Logged />
    </>
  );
}
