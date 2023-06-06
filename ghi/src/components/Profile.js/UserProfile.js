import { useState, useEffect } from "react";

export default function UserProfile() {
  const [user, setUser] = useState("");

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

  return (
    <>
      <div className="h-[100%] mx-auto">
        <div className="main-cover w-full">
          <div className="top-cover bg-green-400 py-36"></div>
          <div className="profile-container flex items-center">
            <div className="profile-circle bg-gray-200 absolute left-1/4 top-1/3 transform lg:-translate-x-[90%] md:-translate-x-1/2 sm:-translate-x-1/5 -translate-x-1/6 -translate-y-1/2 lg:w-64 lg:h-64 md:w-56 md:h-56 sm:w-52 sm:h-52 w-44 h-44 rounded-full transition-all overflow-hidden"></div>
            <div className="bottom-cover py-24 text-bold text-2xl lg:-translate-x-[-520px] translate-y-[-60px] md:-translate-x-[-380px] sm:-translate-x-[-300px] -translate-x-[-300px] transition-transform">
              {user.username}
            </div>
            <div className="ml-auto mr-6 mt-[-130px]">
              <button className="font-bold bg-gray-400 rounded-xl p-2 duration-300 hover:bg-gray-500 hover:scale-105">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 min-h-screen">
          <div className="col-span-4 bg-gray-500 pt-16 text-center">grid 1</div>
          <div className="col-span-8 bg-gray-800 pl-10 pt-16">grid 2</div>
        </div>
      </div>
    </>
  );
}
