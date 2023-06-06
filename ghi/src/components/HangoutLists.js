import React, { useState, useEffect } from "react";

const HangoutList = () => {
  const [hangoutData, setHangoutData] = useState([]);

  const yelpDetails = async (hangout) => {
    const key = process.env.YELP_API_KEY;
    const url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3";
    const headers = {
      "Authorization": `Bearer ${key}`,
    };

    const params = {
      term: hangout.location,
      location: "New York City"
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${queryString}`;

    try {
      const response = await fetch(fullUrl, {
        headers: headers
      });
      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.businesses[0].image_url;

        // Update the hangoutData state with the image URL
        setHangoutData(imageUrl)
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };


  const fetchHangouts = async () => {
    const username = "test@gmail.com";
    const url = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts/${username}`;

    try {
      const response = await fetch(url, {
        credentials: "include"
      });

      if (response.ok) {
        const data = await response.json();
        setHangoutData(data);
      } else {
        console.error(`Request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetchHangouts();
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-[#effdff] mt-[-80px] pt-[80px]">
        <h1 className="text-7xl font-bold text-center mt-10 mb-5">
          Your Upcoming Hangouts
        </h1>
        {hangoutData.length > 0 ? (
          <div className="max-w-[840px] flex text-center p-5 mx-auto grid md:grid-cols-3 gap-16">
            {hangoutData.map((hangout) => {
              yelpDetails(hangout); // Make the API call for each hangout
              return (
                <div
                  key={hangout.id}
                  className="p-3 max-w-[250px] max-h-[250px] text-left shadow-md cursor-pointer hover:bg-gray-200"
                  style={{
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                    backgroundImage: `url(${hangout.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <h2 className="text-2xl font-bold py-1">{hangout.name}</h2>
                  <h4 className="text-base font-medium">{formatDate(hangout.days)}</h4>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="mt-10 text-2xl font-semibold text-center">
              No hangouts yet...
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default HangoutList;
