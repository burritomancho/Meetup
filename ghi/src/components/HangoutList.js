import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logged from "./Logged";
import Swal from "sweetalert2";
import Calendar from "../assets/coffee.jpg";

export default function HangoutList() {
  const [user, setUser] = useState("");
  const [hangouts, setHangouts] = useState([]);
  const [selectedHangouts, setSelectedHangouts] = useState([]);

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

  const fetchHangouts = async () => {
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users/${user.username}/hangouts`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setHangouts(data);
    }
  };
  useEffect(() => {
    fetchHangouts();
  }, []);

  const handleHangoutSelection = (hangoutName) => {
    if (selectedHangouts.includes(hangoutName)) {
      setSelectedHangouts(
        selectedHangouts.filter((name) => name !== hangoutName)
      );
    } else {
      setSelectedHangouts([...selectedHangouts, hangoutName]);
    }
  };

  const deleteSelectedHangouts = async () => {
    if (selectedHangouts.length === 0) {
      Swal.fire("No hangouts selected!", "", "info");
      return;
    }
    Swal.fire({
      title: "Confirm delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const deletePromises = selectedHangouts.map((hangoutName) => {
          const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutName}`;
          return fetch(url, {
            method: "DELETE",
            credentials: "include",
          });
        });

        Promise.all(deletePromises)
          .then((responses) => {
            const successfulDeletions = responses.filter(
              (response) => response.ok
            );
            const failedDeletions = responses.filter(
              (response) => !response.ok
            );

            if (successfulDeletions.length > 0) {
              Swal.fire(
                `${successfulDeletions.length} hangout(s) successfully deleted!`,
                "",
                "success"
              );
            }

            if (failedDeletions.length > 0) {
              Swal.fire(
                `${failedDeletions.length} hangout(s) failed to delete.`,
                "Please try again later.",
                "error"
              );
            }

            fetchHangouts();
            setSelectedHangouts([]);
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete the hangouts.", "error");
          });
      }
    });
  };

  return (
    <>
      <div
        className="bg-center bg-no-repeat bg-cover w-full h-screen pt-32 pl-14"
        style={{
          backgroundImage: `url(${Calendar})`,
          backgroundPositionX: "20%",
          backgroundPositionY: "65%",
        }}
      >
        <div className="py-16">
          <div className="flex text-center items-center justify-center mx-auto">
            <h2 className="">Meet</h2>
            <h2 className="text-white">Up</h2>
          </div>
          <div className="flex flex-col items-center ml-[-10px] mt-20">
            {hangouts.map((hangout) => (
              <div
                className="text-center items-center justify-center flex mb-4"
                key={hangout.name}
              >
                <input
                  type="checkbox"
                  className="checkbox mr-4 h-4 w-4"
                  checked={selectedHangouts.includes(hangout.name)}
                  onChange={() => handleHangoutSelection(hangout.name)}
                />
                <Link
                  to={`/hangouts/${hangout.name}`}
                  className="transitions-all lg:w-[500px] md:w-[400px] sm:w-[350px] w-[280px] font-semibold hover:scale-105 duration-200 p-4 bg-[#556E53] hover:bg-[#435842]"
                >
                  <span className="text-center justify-center items-end">
                    <p className="font-bold lg:text-2xl md:text-xl sm:text-lg text-base">
                      {hangout.name}
                    </p>
                    <p className="lg:text-base md:text-base sm:text-sm text-sm italic text-gray-50">
                      ({hangout.finalized_date})
                    </p>
                  </span>
                </Link>
              </div>
            ))}
            {selectedHangouts.length > 0 && (
              <button
                onClick={deleteSelectedHangouts}
                className="bg-gray-900 text-gray-50 font-bold py-2 px-4 mt-4 rounded ml-8"
              >
                Delete Selected
              </button>
            )}
          </div>
        </div>
      </div>
      <Logged />
    </>
  );
}
