import React, { useState, useContext } from "react";
import { SpoofyContext } from "../context";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const { showSidebar, setShowSidebar } = useContext(SpoofyContext);
  return (
    <header>
      <GiHamburgerMenu
        onClick={() => setShowSidebar(!showSidebar)}
        className="hamburgerBtn"
      />
      <h1>Spoofy</h1>
    </header>
  );
}
