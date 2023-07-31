import React, { useState, useEffect } from "react";
import { RiLoader5Line } from "react-icons/ri";
import "./App.css";
import Hero from "./components/Hero.jsx";
import UserProfile from "./components/Profile/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import HangoutPlan from "./components/HangoutPlan";
import HangoutList from "./components/HangoutList";
import HangoutDetail from "./components/HangoutDetail";
import EditProfile from "./components/Profile/EditProfile";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}`}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <RiLoader5Line className="animate-spin text-blue-500 text-5xl mb-2" />
            <span className="text-gray-600">Loading...</span>
          </div>
        ) : (
          <Routes className="transitions-all" smooth={true}>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Hero />}/>
            <Route path="/register" element={<Hero />} />
            <Route path="/list" element={<HangoutList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/plan_hangout" element={<HangoutPlan />} />
            <Route path="/hangouts/:hangoutName" element={<HangoutDetail />} />
          </Routes>
        )}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
