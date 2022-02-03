import logo from "./logo.svg";
import "./App.css";
import "./CSS/Login.css";
import React, { useState, useEffect, useContext } from "react";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import { SpoofyContext } from "./context";
import Header from "./Components/Header";

// const code = new URLSearchParams(window.location.search).get("code");
// console.log(code);

const App = () => {
  const { showSidebar, setShowSidebar } = useContext(SpoofyContext);
  // return code ? <Dashboard code={code} /> : <Login />;
  return (
    <div className="App">
      {/* <Navbar show={showSidebar}></Navbar> */}
      <Login></Login>
    </div>
  );
};

export default App;
