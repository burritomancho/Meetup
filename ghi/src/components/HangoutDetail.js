import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Logged from "./Logged";

export default function HangoutDetail() {
  const { hangoutName } = useParams();
  const [hangout, setHangout] = useState(null);

  useEffect(() => {
    const fetchHangout = async () => {
      try {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutName}`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setHangout(data);
        } else {
          console.error("Failed to fetch hangout details");
        }
      } catch (error) {
        console.error("Failed to fetch hangout details", error);
      }
    };
    fetchHangout();
  }, [hangoutName]);

  if (!hangout) {
    return <div>Hangout not found</div>;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="w-full h-screen">
      <div className="max-w-[860px] h-full mx-auto">
        <h3 className="text-center pt-24">
          {capitalizeFirstLetter(hangout.name)}
        </h3>
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="rounded-md border-black border col-span-2 md:col-span-1 h-64 pt-4">
            <ul className="pl-4 font-bold">
              Selected Dates:{" "}
              <li className="pt-2 font-normal">
                {capitalizeFirstLetter(hangout.dates.join(", "))}
              </li>
            </ul>
          </div>
          <div className="rounded-md border-black border col-span-2 md:col-span-1 pl-4 pt-4 font-bold">
            Attendees:
            <ul className="pt-2 font-normal">
              {hangout.friends.map((friend) => (
                <li key={friend.username} className="flex justify-start">
                  <p>{capitalizeFirstLetter(friend.username)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto my-5 border-black rounded-md border pl-4 h-20 pt-4 font-bold">
          Selected Location:
          <p className="font-normal">
            {capitalizeFirstLetter(hangout.location)}
          </p>
        </div>
        <div className="mx-auto border-black border rounded-md pl-4 h-20 pt-4 font-bold">
          Hangout notes:{" "}
          <p className="font-normal">
            {capitalizeFirstLetter(hangout.description)}
          </p>
        </div>
        <div className="mx-auto my-5 border-black rounded-md border pl-4 h-20 pt-4 font-bold">
          Finalized Date:{" "}
          <p className="font-normal">
            {capitalizeFirstLetter(hangout.finalized_date)}
          </p>
        </div>
      </div>
      <Logged />
    </div>
  );
}
