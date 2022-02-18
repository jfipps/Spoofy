import React from "react";
import { FaHeadphonesAlt } from "react-icons/fa";
import "../CSS/Dashboard.css";

export default function Sidebar({ show }) {
  return (
    <div className="sidenav">
      <ul id="sidebar-list">
        <li className="ListHeader">
          <a id="sidebar-link" href="/Dashboard">
            <h1>
              <FaHeadphonesAlt className="HeadphonesIcon" />
              Spoofy
            </h1>
          </a>
        </li>
        <li>
          <a id="sidebar-link" href="/Artists">
            Artists
          </a>
        </li>
        <li>
          <a id="sidebar-link" href="/Tracks">
            Tracks
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
