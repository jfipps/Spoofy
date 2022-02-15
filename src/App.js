import logo from "./logo.svg";
import "./App.css";
import "./CSS/Login.css";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { SpoofyContext } from "./context";

const code = new URLSearchParams(window.location.search).get("code");

const App = () => {
  const { showSidebar, setShowSidebar, apiCode, setAPICode } =
    useContext(SpoofyContext);

  return (
    <div className="App">
      {/* <Navbar show={showSidebar}></Navbar> */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Dashboard" element={<Dashboard code={code} />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
