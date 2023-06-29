import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { BsArrowUpRightSquare } from "react-icons/bs";
import Logged from "./Logged";
import React, { useState } from 'react';

const HangoutPlan = () => {
  const { token } = useToken();
  const [friends, setFriends] = useState([]);
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [finalDate, setFinalDate] = useState('');

  const handleLocationChange = (event) => setLocation(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleFriendsChange = (event) => setFriends(event.target.value)
  const handleName = (event) => setName(event.target.value)
  const handleDates = (event) => setDates(event.target.value)

  const yelpUrl =
  if (!token) {
    useNavigate("/login")
  }

	const [isSuccess, setIsSuccess] = useState(false);

	// const sendEmail = (e) => {
	// 	e.preventDefault();

	// 	const serviceId = 'service_zbtm7r2';
	// 	const templateId = 'template_cew9jp9';
	// 	const key = 'aRPRU3-dmvoINGpXp'

	// 	emailjs.sendForm(serviceId, templateId, e.target, key)
	// 		.then(() => {
	// 		console.log('Email sent successfully');
	// 		setIsSuccess(true);
	// 		setFormData({
	// 			name: '',
	// 			email: '',
	// 			subject: '',
	// 			message: '',
	// 		});
	// 		// Perform any additional actions after successful email sending
	// 		}, (error) => {
	// 		console.log('Error sending email:', error);
	// 		// Handle any errors that occur during email sending
	// 		});
	// };

	return (
		<div className="w-full">
			<div className="leading-loose">
			<form className="max-w-xl mx-auto p-6 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left" onSubmit={sendEmail}>
				<p>
					<h2 className="text-2xl font-medium text-primary-dark dark:text-primary-light mb-8">Plan a Hangout!</h2>
				</p>
				{isSuccess && (
					<div className="bg-green-200 text-green-700 py-2 px-4 rounded mb-4">
						Hangout planned successfully!
					</div>
				)}
				<div className="mb-4">
					<label className="block mb-2 text-lg text-primary-dark dark:text-primary-light" htmlFor="name">Your Name</label>
					<input
					className="w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
					type="text"
					id="name"
					name="name"
					placeholder="Your Name"
					value={formData.name}
					onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2 text-lg text-primary-dark dark:text-primary-light" htmlFor="email">Your Email</label>
					<input
					className="w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
					type="email"
					id="email"
					name="email"
					placeholder="Your Email"
					value={formData.email}
					onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2 text-lg text-primary-dark dark:text-primary-light" htmlFor="message">Your Message</label>
					<textarea
					className="w-full px-4 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
					id="message"
					name="message"
					rows="6"
					placeholder="Your Message"
					value={formData.message}
					onChange={handleChange}
					></textarea>
				</div>
				<button className="w-full px-4 py-2 mt-4 text-lg text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg" type="submit">Send</button>
				</form>
			</div>
		</div>
	);
};

export default ContactForm;
