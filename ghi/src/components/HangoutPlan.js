import { Link } from "react-router-dom";
import QRCode from "../assets/QRlocalhost3k.png";
import { BsArrowUpRightSquare } from "react-icons/bs";

export default function HangoutPlan() {
  return (
    <div className="pl-16">
      <h3 className="text-center pt-20">Plan a hangout!</h3>
      <div className="pl-10 min-h-screen text-center py-16 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
        <div className="rounded-xl p-2 border border-black-2 lg:h-1/3 md:h-1/3 sm:h-1/2 h-3/4 w-[90%]">
          <div className="p-2">Who are you hanging out with?</div>
          <div className="p-6 border border-black-2 rounded-xl">
            Share this link: <img src={QRCode} alt="qr-code" />
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
