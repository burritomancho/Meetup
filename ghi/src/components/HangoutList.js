import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logged from "./Logged";
import Swal from "sweetalert2";
import { DeleteIcon } from "@chakra-ui/icons";

export default function HangoutList() {
  const [user, setUser] = useState("");
  const [hangouts, setHangouts] = useState([]);
  const { hangoutName } = useParams();

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
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts`;
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setHangouts(data);
    }
  };

  useEffect(() => {
    fetchHangouts();
  }, []);

  const deleteHangout = async (hangoutId) => {
    Swal.fire({
      title: "Confirm delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${hangoutId}`;
        fetch(url, {
          method: "DELETE", // Changed to uppercase "DELETE"
          credentials: "include",
        }).then((response) => {
          if (response.ok) {
            Swal.fire("Successfully deleted!", "", "success");
            fetchHangouts();
          } else {
            Swal.fire("Error", "Failed to delete the file.", "error");
          }
        });
      }
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="flex text-center items-center justify-center py-16 ml-6">
        <h2 className="">Meet</h2>
        <h2 className="text-white">Up</h2>
      </div>
      <div className="pt-10 flex flex-col items-center">
        {hangouts.map((hangout) => (
          <div
            className="text-center items-center justify-center flex mb-2"
            key={hangout.name}
          >
            <input type="checkbox" className="checkbox mr-4 h-4 w-4" />
            <Link
              to={`/hangouts/${hangout.name}`}
              className="text-xl border-2 border-black font-semibold hover:scale-105 duration-200 p-4"
              style={{ width: "300px" }}
            >
              <span>
                {hangout.name}&nbsp;&nbsp;{hangout.finalized_date}
              </span>
            </Link>
            <button
              onClick={() => deleteHangout(hangout.id)}
              className="text-red-500 font-bold mb-2 w-8 h-8 hover:scale-110"
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
      <Logged />
    </div>
  );
}
