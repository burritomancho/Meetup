import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-5">Login</h1>
        <form onSubmit={handleSubmit} id="new-user" className="max-w-md">
          <div className="mb-5">
            <label className="text-lg block font-bold mb-2" htmlFor="email">
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
            <label className="text-lg block font-bold mb-2" htmlFor="password">
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
                <Link to="/signup" className="pl-2 text-blue-500 font-semi-bold">
                Sign up
                </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
