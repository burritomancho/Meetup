import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiCopyright } from "react-icons/bi";
import image from "../../assets/login.jpg";
import useToken, { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

export default function Login() {
  const navigate = useNavigate();
  const { login, token } = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(username, password);
      await login(username, password);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(useAuthContext);
  console.log(login);
  const userUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users`;
  console.log(userUrl);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <div className="h-[100%] grid grid-cols-1 sm:grid-cols-2 rounded-md p-[1px] mx-auto">
        <div className="m-5 max-w-[250px] ml-[130px]">
          <h1 className="text-xl font-bold pb-[160px] ml-[-100px] flex">
            Meet<span className="text-black">Up</span>
            <BiCopyright size={15} className="my-auto mx-1" />
          </h1>
          <h1 className="text-5xl mb-7 font-bold text-center">Welcome!</h1>
          <form onSubmit={handleSubmit} id="new-user">
            <div className="mb-5">
              <label
                className="text-sm block font-semibold mb-1"
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
            <div className="mb-8">
              <label
                className="text-sm block font-semibold mb-1"
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
              className="w-full bg-[#acae77] hover:bg-[#7b7b50] text-white font-normal text-sm py-2 mb-1"
              type="submit"
            >
              Login
            </button>
            <div className="flex items-center justify-center">
              <p className="text-md font-semibold pt-2">
                No account? Register&nbsp;
                <Link to="/register" className=" text-blue-500 font-semi-bold">
                  here!
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
