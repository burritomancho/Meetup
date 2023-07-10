import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import HangoutPlanImage from './/../images/PlanHangout.jpg';
import CalendarImage from './/../images/Calendar.jpg';
import FriendsImage from './/../images/Friends.jpg';
import NightlifeImage from './/../images/Nightlife.jpg';
import Plan from './/../images/Plan.jpg';
import Logged from "./Logged";

const HangoutPlan = () => {
  const { token } = useToken();
  const [name, setName] = useState('');
  const [term, setTerm] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [friendUsername, setFriendUsername] = useState('');
  const [friends, setFriends] = useState([]);
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDates] = useState('');
  const [description, setDescription] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleNameChange = (event) => setName(event.target.value)
  const handleTermChange = (event) => setTerm(event.target.value);
  const handleUserLocationChange = (event) => setUserLocation(event.target.value);
  const handleSelectedDateChange = (event) => setSelectedDates(event.target.value);
  const handleFriendUsernameChange = (event) => {setFriendUsername(event.target.value.trim());};

  const yelpUrl = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/api/yelp_locations?city=${encodeURIComponent(userLocation)}&term=${encodeURIComponent(term)}`
  const friendCheckURL = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/users/${friendUsername}`;

  if (!token) {
    navigate("/login")
  }

  const handleAddFriend = async () => {
	if (friendUsername && friends.length < 5) {
		const response = await fetch(friendCheckURL, {
			credentials: "include",
		})
		if (response.ok) {
			const data = await response.json()
		// If the user exists, add it to the friends lists
			if (data) {
				console.log("working")
				setFriends((prevFriends) => [...prevFriends, {"username": friendUsername}]);
			} else {
				console.log("User does not exist");
			}
		}
		}
  };

  const handleRemoveFriend = (friend) => {
	const updatedFriends = friends.filter(
		(addedFriend) => addedFriend.username !== friend.username
	);
	setFriends(updatedFriends);
  };

  const handleAddDate = async () => {
	if (dates.length < 5) {
		setDates((prevDates) => [...prevDates, selectedDate]);
	}
  };

  const handleRemoveDate = (date) => {
	const updatedDates = dates.filter(
		(addedDate) => addedDate !== date
	);
	setDates(updatedDates);
  };


  const fetchLocations = async () => {
    try {
      const response = await fetch(yelpUrl, {
		credentials: "include",
	  });
      if (response.ok) {
        const data = await response.json()
        setLocations(data.businesses);
		setShowOptions(true);
      } else {
        throw new Error("Failed to fetch locations from Yelp API");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
	friends.map((friend) => friend.selected_date = "2023-07-10")
    const data = {};
    data.location = location;
	data.friends = friends;
	data.dates = dates;
	data.finalized_date = "2023-06-30";
	data.name = name;
	data.description = description;

    const createHangoutURL = `${process.env.REACT_APP_USER_SERVICE_API_HOST}/hangouts`;
    const fetchConfig = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(createHangoutURL, fetchConfig);

    if (response.ok) {
      navigate("/login")
    }
  };
	const [isSuccess, setIsSuccess] = useState(false);

	return (
		<>
		<div className="w-full min-h-screen bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${HangoutPlanImage})` }}>
			<div className="leading-loose">
			<form className="w-3/4 mx-auto p-6 bg-white dark:bg-secondary-dark rounded-xl text-left" style={{ backgroundColor: 'transparent' }} onSubmit={handleSubmit}>
				<div className="relative">
					<img src={Plan} alt="Plan a Hangout" className="h-72 w-full object-cover rounded-xl" />
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full">
						<h1 className="text-white text-8xl font-semibold" style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}>Plan a Hangout</h1>
						<div className="mt-8 flex justify-center">
						<label className="block mt-2 mr-6 text-2xl text-center text-white text-primary-dark dark:text-primary-light">Hangout Name</label>
						<input
							className="w-1/3 px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							value={name}
							onChange={handleNameChange}
						/>
						</div>
					</div>
				</div>
				<div className="h-screen mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="mb-4 h-full bg-cover bg-center rounded-xl p-4 transform transition-all duration-200 hover:scale-105"  style={{ backgroundImage: `url(${FriendsImage})` }}>
						<label className="mt-8 block mb-2 text-2xl text-center text-primary-dark dark:text-primary-light" style={{ textShadow: '2px 2px 4px rgba(255, 255, 0, 10.0)' }} htmlFor="friends">
							Add Friends
						</label>
						<div className="mt-4 grid grid-cols-1 gap-4 flex">
							<div className="flex justify-center">
								<input
									className="w-3/4 px-4 py-2 mr-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
									type="text"
									id="friends"
									name="friends"
									placeholder="Enter friend's username"
									value={friendUsername}
									onChange={handleFriendUsernameChange}
								/>
							</div>
							<div className="mt-4 flex justify-center">
								<button
									className="px-4 py-2 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg"
									type="button"
									onClick={handleAddFriend}
									disabled={!friendUsername || friends.length >= 5}
								>
									Add to Hangout
								</button>
							</div>
						</div>
						{friends.length > 0 && (
							<div className="mt-4>">
								<p className="text-2xl font-bold text-white">Added Friends:</p>
								{friends.map((friend) => (
									<div
									  key={friend.username}
									  className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded"
									>
									<span className="pl-3">{friend.username}</span>
										<button
											className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
											onClick={() => handleRemoveFriend(friend)}
										>
											X
										</button>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="h-full bg-cover bg-center rounded-xl p-4 transform transition-all duration-200 hover:scale-105"  style={{ backgroundImage: `url(${NightlifeImage})` }}>
						<div className="mb-4 grid grid-cols-2">
							<div className="mr-2 mt-8">
								<label className="block mb-2 text-white text-2xl text-primary-dark dark:text-primary-light" style={{ textShadow: '2px 2px 4px rgba(255, 255, 0, 10.0)' }} htmlFor="term">
									Looking for..
								</label>
								<input
									className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
									type="text"
									id="term"
									name="term"
									placeholder="Food, Entertainment, etc.."
									value={term}
									onChange={handleTermChange}
								/>
							</div>
							<div className="ml-2 mt-8">
								<label className="block mb-2 text-white text-2xl text-primary-dark dark:text-primary-light" style={{ textShadow: '2px 2px 4px rgba(255, 255, 0, 10.0)' }} htmlFor="location">
									City
								</label>
								<input
									className="mt-2 w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
									type="text"
									id="location"
									name="location"
									placeholder="Enter location"
									value={userLocation}
									onChange={handleUserLocationChange}
								/>
							</div>
						</div>
						<div className="flex justify-center">
							<button
								className="w-1/2 justify-center px-4 py-2 mt-4 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg"
								type="button"
								onClick={fetchLocations}
								disabled={!userLocation || !term}
							>
								Show me my hangout options!
							</button>
						</div>
						{showOptions && (
							<div className="mb-4 mt-4">
								<label className="block mb-2 text-lg text-primary-dark dark:text-primary-light" htmlFor="location">
									Location Options
								</label>
								<div className="flex justify-center">
									<select
										className="form-select file:shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										onChange={handleLocationChange}
										id="location"
										value={location}
									>
										<option value="">Select a location</option>
											{locations &&
												locations.map((locationName) => {
												return (
													<option key={locationName.id} value={locationName.name}>
													{locationName.name}
													</option>
												);
											})}
									</select>
								</div>
							</div>
						)}
					</div>
						<div className="h-full bg-cover bg-center rounded-xl p-4 transform transition-all duration-200 hover:scale-105"  style={{ backgroundImage: `url(${CalendarImage})` }}>
						<div className="mr-2">
							<label className="mt-8 block mb-2 text-center text-white text-2xl text-primary-dark dark:text-primary-light" style={{ textShadow: '2px 2px 4px rgba(255, 255, 0, 10.0)' }} htmlFor="term">
							Select up to 5 possible dates
							</label>
							<div className="flex justify-center">
							<input
								className="mt-2 w-1/2 px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
								id="dates"
								name="dates"
								type="date"
								placeholder="Hangout on..."
								value={selectedDate}
								onChange={handleSelectedDateChange}
							/>
							</div>
							<div className="mt-4 flex justify-center">
							<button
								className="mt-4 px-4 py-2 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg"
								type="button"
								onClick={handleAddDate}
								disabled={!selectedDate || dates.length >= 5}
							>
								Add Date Option
							</button>
							</div>
							{dates.length > 0 && (
							<div className="mt-4">
								<p className="text-2xl font-bold text-white">Dates:</p>
								{dates.map((singularDate) => (
								<div
									key={singularDate.id}
									className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-2 mt-2 rounded"
								>
									<span className="pl-3">{singularDate}</span>
									<button
										className="px-2 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
										onClick={() => handleRemoveDate(singularDate)}
									>
										X
									</button>
								</div>
								))}
							</div>
							)}
						</div>
						</div>
					<div className="mb-4">
						<div>
							<label className="block mb-2 text-lg text-primary-dark dark:text-primary-light" htmlFor="message">Hangout description or notes</label>
							<textarea
							className="w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
							id="notes"
							name="notes"
							rows="6"
							placeholder="Hangout Notes"
							value={description}
							onChange={handleDescriptionChange}
							></textarea>
						</div>
					</div>
					<div className="h-1/3 flex items-center">
						<button className="w-full px-4 py-2 mt-4 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg" type="submit">Create</button>
					</div>
				</div>
				</form>
			</div>
		</div>
		<Logged />
		</>
	);
};

export default HangoutPlan;
