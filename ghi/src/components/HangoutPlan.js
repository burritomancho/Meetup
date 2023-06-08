import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import emailjs from "emailjs-com";
import Logged from "./Logged";

export default function HangoutPlan() {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [user, setUser] = useState("");

  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
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
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_6sd6o2c",
        "template_l1o0rqa",
        {
          from_name: `${user.username}`,
          message:
            "Hello! You're invited to join my hangout. Let's schedule and have a great time together!",
          to_email: recipientEmail,
        },
        "YoA0FOcSSs_2nc0Xo"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        setRecipientEmail("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="pl-16">
      <h3 className="text-center pt-20">Plan a Hangout!</h3>
      <div className="pl-10 min-h-screen text-center py-16 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Invite Your Hangout Companions</div>
          <div className="p-6 rounded-xl justify-center items-center text-center">
            <form onSubmit={sendEmail} className="grid-row-2 grid">
              <input
                type="email"
                placeholder="Recipient Email"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                required
                className="text-center mb-2 p-1"
              />
              <button
                type="submit"
                className="font-semibold text-center border-black border py-1 w-20 mx-auto rounded-2xl hover:bg-gray-200"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Select a Date and Time</div>
          <div className="p-6 grid grid-row-2 justify-center items-end text-center rounded-xl">
            <Link
              to="/calendar"
              className="duration-300 transition hover:scale-105"
            >
              Access Calendar
            </Link>
            <div className="flex justify-center">
              <BsArrowUpRightSquare className="h-6 w-6" />
            </div>
          </div>
        </div>
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Discover a Hangout Location</div>
          <div className="p-6 grid grid-row-2 justify-center items-end text-center rounded-xl">
            <a
              href="yelp.com"
              className="duration-300 transition hover:scale-105"
            >
              Explore on Yelp
            </a>
            <div className="flex justify-center">
              <BsArrowUpRightSquare className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
      <Logged />
    </div>
  );
}
