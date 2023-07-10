import "./App.css";
import Hero from "./components/Hero.jsx";
import UserProfile from "./components/Profile.js/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import HangoutPlan from "./components/HangoutPlan";
import Details from "./components/Details";
import HangoutList from "./components/HangoutList";
import HangoutDetail from "./components/HangoutDetail";

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
          <Route path="/list" element={<HangoutList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/plan_hangout" element={<HangoutPlan />} />
          <Route path="/details" element={<HangoutDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
