import { Link } from "react-router-dom";
import { useState } from "react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import emailjs from "emailjs-com";

export default function HangoutPlan() {
  const [recipientEmail, setRecipientEmail] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_6sd6o2c",
        "template_l1o0rqa",
        {
          from_name: "notification.meetup@gmail.com",
          message: "Email content",
          to_email: recipientEmail,
        },
        "YOUR_USER_ID"
      )
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleRecipientEmailChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  return (
    <div className="pl-16">
      <h3 className="text-center pt-20">Plan a hangout!</h3>
      <div className="pl-10 min-h-screen text-center py-16 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Who are you hanging out with?</div>
          <div className="p-6 border border-black-2 rounded-xl text-center grid-row-2 grid">
            <form onSubmit={sendEmail}>
              <input
                type="email"
                placeholder="Recipient Email"
                value={recipientEmail}
                onChange={handleRecipientEmailChange}
                required
                className="text-center"
              />
            </form>
            <button
              type="submit"
              className="text-center border-black border mx-48"
            >
              Send Email
            </button>
          </div>
        </div>
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">When are you planning to hangout?</div>
          <div className="p-6 grid grid-row-2 justify-center items-center text-center rounded-xl border border-black-2">
            <Link to="/calendar">Go to Calendar</Link>
            <BsArrowUpRightSquare className="h-6 w-6" />
          </div>
        </div>
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Where are you hanging out?</div>
          <div className="p-6 grid grid-row-2 justify-center text-center rounded-xl border border-black-2">
            <a href="yelp.com">Yelp</a>
            <BsArrowUpRightSquare className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
