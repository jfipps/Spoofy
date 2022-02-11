import React from "react";

export default function Sidebar({ show }) {
  return (
    <div className={show ? "sidenav active" : "sidenav"}>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/Tracks">Tracks</a>
        </li>
        <li>
          <a href="/Dashboard">Artists</a>
        </li>
        <li>
          <a href="/Recents">Recents</a>
        </li>
      </ul>
    </div>
  );
}
