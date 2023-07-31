import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logged from "../Logged";
import Swal from "sweetalert2";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("");
  const [picture, setPicture] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePictureUrlChange = (event) => {
    setPictureUrl(event.target.value);
  };

  const fetchUser = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.account);
      setPicture(data.account.picture);
      setUserName(data.account.username);
      setEmail(data.account.email);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    data.hangouts = {};
    data.friends = [];
    if (username !== user.username) {
        data.username = username;
    }
    if (email !== user.email) {
        data.email = email;
    }
    if (pictureUrl) {
        setPicture(pictureUrl);
        data.picture = pictureUrl;
    }
    const userUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users/${user.username}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      console.log(data);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
      }).then(() => {
        navigate("/profile");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update profile. Please try again later.",
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 pt-32 ml-14 min-h-screen">
        <h1 className="text-center mb-12 lg:text-6xl md:text-5xl sm:text-4xl text-3xl">
          Edit Profile
        </h1>
        <div className="flex items-center justify-center object-center">
          <form
            onSubmit={handleSubmit}
            id="new-user"
            className="bg-white w-1/2 border-black border-2 p-4 rounded-lg"
          >
            <div className="mb-5">
              <div className="flex flex-col items-center my-4">
                <div className="rounded-full bg-gray-50 overflow-hidden">
                  <img
                    className="lg:h-52 lg:w-52 md:h-44 md:w-44 sm:h-40 sm:w-40 w-32 h-32 object-cover"
                    src={picture}
                    alt="Profile"
                  />
                </div>
              </div>
                <label className="text-sm block font-semibold mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  className="border rounded w-full py-2 px-3"
                  onChange={handlePictureUrlChange}
                  value={pictureUrl}
                  placeholder="Insert link"
                />
          </div>
            <div className="mb-5">
              <label
                className="text-sm block font-semibold mb-1"
                htmlFor="username"
              >
                Change Username&nbsp;
              </label>
              <input
                required
                className="border rounded w-full py-2 px-3"
                onChange={handleUserNameChange}
                type="text"
                name="username"
                value={username}
              />
            </div>
            <div className="mb-5">
              <label
                className="text-sm block font-semibold mb-1"
                htmlFor="email"
              >
                Change Email Address&nbsp;
              </label>
              <input
                required
                className="border rounded w-full py-2 px-3"
                onChange={handleEmailChange}
                type="text"
                name="email"
                value={email}
              />
            </div>
            <button
              className="duration-300 w-full bg-[#acae77] hover:bg-[#7b7b50] text-white font-semibold py-2 mb-2"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <Logged />
    </>
  );
}
