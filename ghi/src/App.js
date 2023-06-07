import "./App.css";
import Hero from "./components/Hero.jsx";
import HangoutLists from "./components/HangoutLists.js"
import UserProfile from "./components/Profile.js/UserProfile";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import HangoutPlan from "./components/HangoutPlan";
import Details from "./components/Details";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider baseUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}`}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Hero />} />
          <Route path="/register" element={<Hero />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/plan_hangout" element={<HangoutPlan />} />
          <Route path="/details" element={<Details />} />
          <Route path="/home" element={<HangoutLists />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
