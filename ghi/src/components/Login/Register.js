import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import image from "../../assets/register.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.email = email;
    data.password = password;
    const userUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users`;
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  };

  return (
    <>
      <div className="h-[100%] grid grid-cols-1 sm:grid-cols-2 justify-center items-center p-[1px]">
        <div className="m-5 max-w-[250px] ml-[130px]">
          <h1 className="text-4xl font-bold pb-[100px] ml-[-100px]">
            Meet<span className="text-black">Up</span>
          </h1>
          <h1 className="text-2xl mb-5 font-semibold text-center">
            Ready to make some memories?
          </h1>
          <form onSubmit={handleSubmit} id="new-user">
            <div className="mb-5">
              <label
                className="text-lg block font-semibold mb-2"
                htmlFor="username"
              >
                Username&nbsp;
                <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                onChange={handleUserNameChange}
                required
                type="text"
                name="username"
                value={username}
              />
            </div>
            <div className="mb-5">
              <label
                className="text-lg block font-semibold mb-2"
                htmlFor="email"
              >
                Email Address&nbsp;
                <span className="text-red-500 font-normal">*</span>
              </label>
              <input
                className="border rounded w-full py-2 px-3"
                onChange={handleEmailChange}
                required
                type="text"
                name="email"
                value={email}
              />
            </div>
            <div className="mb-8">
              <label
                className="text-lg block font-semibold mb-2"
                htmlFor="password"
              >
                Password&nbsp;
                <span className="text-red-500 font-normal">*</span>
              </label>
              <div className="relative">
                <input
                  className="border rounded w-full py-2 px-3 pr-10"
                  onChange={handlePasswordChange}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                />
                <button
                  className="absolute right-2 top-0 h-full w-10 text-gray-400 hover:text-gray-500 flex items-center justify-center"
                  onClick={toggleShowPassword}
                  type="button"
                >
                  {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
            </div>
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl mb-2"
              type="submit"
            >
              Sign Up
            </button>
            <div className="flex justify-center items-center">
              <p className="text-md font-semibold pt-2">
                Already a user?
                <Link to="/login" className="pl-2 text-blue-500 font-semi-bold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="hidden sm:block">
          <img
            src={image}
            alt="login"
            width={500}
            height={700}
            className="rounded-r-md shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
