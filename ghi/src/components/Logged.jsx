import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { CgProfile } from "react-icons/cg";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdPendingActions, MdOutlinePending } from "react-icons/md";
import Swal from "sweetalert2";

function Logged() {
  const [show, setShow] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { logout } = useToken();

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  const showPopup = () => {
    Swal.fire({
      text: "If you have any questions regarding our application or find any errors please contact us at notification.meetup@gmail.com.",
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  return (
    <div>
      <div
        className={`fixed left-0 top-0 w-[70px] h-screen bg-[#4f5038] shadow-xl transition duration-1000 ${
          show
            ? "translate-x-0 ease-in-out opacity-100"
            : "-translate-x-full ease-out opacity-40"
        }`}
      >
        <div className="grid grid-cols-1 h-full">
          <div className="drop-shadow-2xl">
            <Link to="/list">
              <div className="cursor-pointer">
                <img
                  src={logo}
                  alt="logo"
                  className="w-[40px] h-[40px] mx-auto my-3"
                />
              </div>
            </Link>
            <ul>
              <Link to="/profile">
                <li
                  title="Profile"
                  className="text-black border-b-[1px] border-t-[3px] border-[#646445] py-4 hover:bg-[#383825] transition duration-300"
                >
                  <CgProfile size={26} color="#c8c888" className="mx-auto" />
                </li>
              </Link>
              <Link to="/plan_hangout">
                <li
                  title="Plan hangout"
                  className="text-black border-b-[1px] border-t-2 border-[#646445] py-4 hover:bg-[#383825] transition duration-300"
                >
                  <AiOutlineCalendar
                    size={26}
                    color="#c8c888"
                    className="mx-auto"
                  />
                </li>
              </Link>
              <Link to="/list">
                <li
                  title="List of hangouts"
                  className="text-black border-b-[3px] border-t-2 border-[#646445] py-4 hover:bg-[#383825] transition duration-300"
                >
                  <MdPendingActions
                    size={26}
                    color="#c8c888"
                    className="mx-auto"
                  />
                </li>
              </Link>

              <li
                className="text-black border-b-[3px] border-t-1 border-[#646445] py-4 hover:bg-[#383825] transition duration-300"
                onClick={handleSidebar}
              >
                <MdOutlinePending
                  size={26}
                  color="#c8c888"
                  className="mx-auto"
                />
              </li>
            </ul>
          </div>
          <div className="mx-auto flex items-end mb-5">
            <button onClick={showPopup}>
              <BsFillQuestionCircleFill
                className="shadow-xl"
                size={27}
                color="#c8c888"
                onMouseOver={({ target }) => (target.style.color = "#919162")}
                onMouseOut={({ target }) => (target.style.color = "#c8c888")}
              />
            </button>
          </div>
        </div>
        <div>
          <div
            className={`fixed left-0 top-0 w-[220px] h-full bg-[#4f5038] shadow-2xl transition duration-500 ${
              showSidebar
                ? "translate-x-0 ease-in-out"
                : "translate-x-[-220px] ease-out"
            }`}
          >
            <div className="flex justify-between border-b-2 border-[#646445]">
              <Link to="/list" onClick={handleSidebar}>
                <h2 className="m-3 text-4xl">
                  Meet<span className="text-white">Up</span>
                </h2>
              </Link>
              <IoMdClose
                size={23}
                className="m-2 cursor-pointer"
                color="#c8c888"
                onClick={handleSidebar}
              />
            </div>
            <div>
              <ul>
                <Link to="/profile" onClick={handleSidebar}>
                  <li className="px-3 py-2 pl-5 border-b-2 border-[#646445] text-lg font-semibold text-[#c8c888] hover:text-[#cbcb86] hover:bg-[#383825]">
                    Profile
                  </li>
                </Link>
                <Link to="/list" onClick={handleSidebar}>
                  <li className="px-3 py-2 pl-5 border-b-2 border-[#646445] text-lg font-semibold text-[#c8c888] hover:text-[#cbcb86] hover:bg-[#383825]">
                    Hangouts
                  </li>
                </Link>
                <Link to="/" onClick={handleLogout}>
                  <li className="px-3 py-2 flex border-b-2 border-[#646445] text-lg font-semibold text-[#c8c888] hover:text-[#cbcb86] hover:bg-[#383825]">
                    <BiLogOutCircle size={20} className="my-auto m-1" />
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logged;
