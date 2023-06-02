import "./App.css";
import Hero from "./components/Hero.jsx";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
