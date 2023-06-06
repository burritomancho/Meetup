import "./App.css";
import Hero from "./components/Hero.jsx";
import HangoutLists from "./components/HangoutLists.js"
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Hero />} />
        <Route path="/register" element={<Hero />} />
        <Route path="/hangouts" element={<HangoutLists /> } />
      </Routes>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
