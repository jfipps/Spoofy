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
import useAuth from "./Components/useAuth";
import { SpoofyContext } from "./context";

const code = new URLSearchParams(window.location.search).get("code");

// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expireTime: "expiresIn",
  timestamp: "currentTime",
};

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

const App = () => {
  const { showSidebar, setShowSidebar, setApiCode, setAccess, showRecent } =
    useContext(SpoofyContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      Math.floor(Date.now() / 1000) - LOCALSTORAGE_VALUES.timestamp <
      LOCALSTORAGE_VALUES.expireTime
    ) {
      console.log("Successful");
      setLoggedIn(true);
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Dashboard code={code} /> : <Login />}
          ></Route>
          <Route path="/Dashboard" element={<Dashboard code={code} />}></Route>
          <Route path="/ArtistPage" element={<ArtistPage></ArtistPage>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
