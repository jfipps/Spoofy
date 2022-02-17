import React from "react";
import "../CSS/Dashboard.css";

export default function Sidebar({ show }) {
  return (
    <div className="sidenav">
      <ul id="sidebar-list">
        <li>
          <a id="sidebar-link" href="/Tracks">
            Tracks
          </a>
        </li>
        <li>
          <a id="sidebar-link" href="/Dashboard">
            Artists
          </a>
        </li>
        <li>
          <a id="sidebar-link" href="/Recents">
            Recents
          </a>
        </li>
      </ul>
    </div>
  );
}
