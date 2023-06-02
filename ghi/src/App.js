import "./App.css";
import Hero from "./components/Hero.jsx";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
      <Sidebar />
    </BrowserRouter>
  );
}

export default App;
