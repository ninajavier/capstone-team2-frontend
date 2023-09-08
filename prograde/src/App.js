import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Community from "./Pages/Community";
import FindRoute from "./Pages/FindRoute";
import Login from "./Pages/Login";
import Profile from "./Components/UserProfile";
import Settings from "./Pages/Settings";
import StationInfo from "./Pages/StationInfo";
import LandingPage from "./Pages/LandingPage";
import ThreadList from "./Components/ThreadList";
import AuthModal from "./Components/AuthModal";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null); // Initialize user state

  return (
    <div className="App">
      <AuthProvider>
        <UserProvider value={{ user, setUser }}>
          {" "}
          {/* Wrap components with UserContext.Provider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/community" element={<Community />} />
            <Route path="/find-route" element={<FindRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/station-info" element={<StationInfo />} />
            <Route path="/threads" element={<ThreadList />} />
          </Routes>
          <AuthModal />
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
