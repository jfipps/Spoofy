import React from "react";

export default function Navbar({ show }) {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/tracks">Tracks</a>
        </li>
        <li>
          <a href="/artists">Artists</a>
        </li>
      </ul>
    </div>
  );
}
