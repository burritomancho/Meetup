import "./App.css";
import Hero from "./components/Hero.jsx";
import UserProfile from "./components/Profile.js/UserProfile";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <AuthProvider
        baseUrl={`${process.env.REACT_APP_USER_SERVICE_API_HOST}`}
      >
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Hero />} />
          <Route path="/register" element={<Hero />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
        <Sidebar />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
