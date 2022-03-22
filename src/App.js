import logo from "./logo.svg";
import "./App.css";
import "./CSS/Login.css";
import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  UseNavigate,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ArtistPage from "./Pages/ArtistPage";
import Tracks from "./Pages/Tracks";
import useAuth from "./Components/useAuth";
import { SpoofyContext } from "./context";

// grabs code from url after login button click if available
const code = new URLSearchParams(window.location.search).get("code");

// map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expireTime: "expiresIn",
  timestamp: "currentTime",
};

// map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const App = () => {
  // context calls
  const {
    showSidebar,
    setShowSidebar,
    setApiCode,
    setAccess,
    showRecent,
    loggedIn,
    setLoggedIn,
  } = useContext(SpoofyContext);

  // checks to see if expiresIn time for API has been reached
  useEffect(() => {
    if (
      Math.floor(Date.now() / 1000) - LOCALSTORAGE_VALUES.timestamp <
      LOCALSTORAGE_VALUES.expireTime
    ) {
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        {/* Auto pushes to Dashboard if logged in already */}
        <Route
          path="/"
          element={loggedIn ? <Dashboard code={code} /> : <Login />}
        ></Route>
        <Route path="/Dashboard" element={<Dashboard code={code} />}></Route>
        <Route path="/Tracks" element={<Tracks code={code} />}></Route>
        <Route path="/ArtistPage" element={<ArtistPage></ArtistPage>} />
      </Routes>
    </div>
  );
};

export default App;
