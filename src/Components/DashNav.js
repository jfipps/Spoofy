import React, { useContext } from "react";
import "../CSS/Dashboard.css";
import "../App.css";
import { Container, Navbar } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { SpoofyContext } from "../context";

export default function DashNav() {
  const { showSidebar, setShowSidebar } = useContext(SpoofyContext);
  return (
    <>
      <Navbar id="navbar" className="DashNav">
        <div className="NavbarStart">
          <button id="spoofy-link" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars size={24}></FaBars>
          </button>
        </div>
        <div className="NavbarEnd">
          <button>Home</button>
          <button>Logout</button>
        </div>
      </Navbar>
    </>
  );
}
