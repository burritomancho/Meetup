import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiCopyright } from "react-icons/bi";
import image from "../../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
  };

  return (
    <>
      <div className="h-[100%] grid grid-cols-1 sm:grid-cols-2 rounded-md p-[1px] mx-auto">
        <div className="m-5 max-w-[250px] ml-[130px]">
          <h1 className="text-xl font-bold pb-[150px] ml-[-100px] flex">
            Meet<span className="text-black">Up</span>
            <BiCopyright size={15} className="my-auto mx-1" />
          </h1>
          <h1 className="text-2xl mb-5 font-semibold text-center">
            Welcome back!
          </h1>
          <form onSubmit={handleSubmit} id="new-user">
            <div className="mb-5">
              <label
                className="text-lg block font-semibold mb-2"
                htmlFor="email"
              >
                Email&nbsp;
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
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl mb-2"
              type="submit"
            >
              Login
            </button>
            <div className="flex items-center justify-center">
              <p className="text-md font-semibold pt-2">
                Not registered?
                <Link
                  to="/signup"
                  className="pl-2 text-blue-500 font-semi-bold"
                >
                  Sign up
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
