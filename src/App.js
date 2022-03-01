import logo from "./logo.svg";
import "./App.css";
import "./CSS/Login.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ArtistPage from "./Pages/ArtistPage";
import useAuth from "./Components/useAuth";
import { SpoofyContext } from "./context";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const { showSidebar, setShowSidebar, setApiCode, setAccess, showRecent } =
    useContext(SpoofyContext);

  useEffect(() => {
    console.log("Code " + code);
  }, [code]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Dashboard" element={<Dashboard code={code} />}></Route>
          <Route path="/ArtistPage" element={<ArtistPage></ArtistPage>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
