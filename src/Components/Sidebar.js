import React from "react";
import { Link } from "react-router-dom";
import { FaHeadphonesAlt } from "react-icons/fa";
import "../CSS/Dashboard.css";

export default function Sidebar({ show }) {
  return (
    <section className="sidenav">
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
          <Link id="sidebar-link" to={{ pathname: "/tracks" }}>
            Tracks
          </Link>
        </li>
        <li>
          <a id="sidebar-link" href="/Recents">
            Recents
          </a>
        </li>
      </ul>
    </section>
  );
}
