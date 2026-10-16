import { NavLink, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Details from "./pages/Details";
import MyTrip from "./pages/MyTrip";
import { useTrip } from "./TripContext";
import "./App.css";

export default function App() {
  const { trip } = useTrip();

  return (
    <div className="app">
      <nav className="nav">
        <span className="logo">TripWise</span>
        <div className="links">
          <NavLink to="/" end>Explore</NavLink>
          <NavLink to="/trip">
            My Trip <span className="badge">{trip.length}</span>
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/destination/:id" element={<Details />} />
        <Route path="/trip" element={<MyTrip />} />
        <Route path="*" element={<p className="message">Page not found.</p>} />
      </Routes>
    </div>
  );
}