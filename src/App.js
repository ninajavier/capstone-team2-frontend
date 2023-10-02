import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Community from "./Pages/Community";
import FindRoute from "./Pages/FindRoute";
import Profile from "./Components/UserProfile";
import Settings from "./Pages/Settings";
import StationInfo from "./Pages/StationInfo";
import LandingPage from "./Pages/LandingPage";
import UpdateProfile from "./Pages/UpdateProfile";
import NotFoundPage from "./Pages/NotFoundPage";
import Developers from "./Pages/Developers"; // Import the MeetTheDevelopers component

import SubwayAlerts from "./Components/SubwayAlerts";
import FilterDropdown from "./Components/FilterDropdown";
import { AuthProvider } from "./context/AuthContext";
// import { UserProvider } from "./context/UserContext";
import { UserProvider } from "./providers/UserProvider";
import { MapProvider } from "./Components/MapContext";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import DateFilter from "./Components/DateFilter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <div className="App">
      <AuthProvider>
        <UserProvider value={{ user, setUser }}>
          {" "}
          {/* Wrap components with UserContext.Provider */}
          <MapProvider>
            <Navbar />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Routes>
                <Route path="/" element={<LandingPage setUser={setUser} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/find-route" element={<FindRoute />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/update-profile" element={<UpdateProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/station-info" element={<StationInfo />} />
                <Route path="/subway-alerts" element={<SubwayAlerts />} />
                <Route path="/dropdown" element={<FilterDropdown />} />
                <Route path="/date" element={<DateFilter />} />
                <Route path="/developers" element={<Developers />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </LocalizationProvider>
            <Footer />
          </MapProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
