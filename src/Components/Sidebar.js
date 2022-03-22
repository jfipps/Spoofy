import React from "react";
import { useContext } from "react";
import { SpoofyContext } from "../context";
import { Link } from "react-router-dom";
import { FaHeadphonesAlt } from "react-icons/fa";
import "../CSS/Dashboard.css";

export default function Sidebar({ show }) {
  const { activePage, setActivePage, setLoading } = useContext(SpoofyContext);
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
          <Link
            id={
              activePage === "Artists" ? "sidebar-link-active" : "sidebar-link"
            }
            to={{ pathname: "/dashboard" }}
            onClick={() => setActivePage("Artists")}
          >
            Artists
          </Link>
        </li>
        <li>
          <Link
            id={
              activePage === "Tracks" ? "sidebar-link-active" : "sidebar-link"
            }
            to={{ pathname: "/tracks" }}
            onClick={() => setActivePage("Tracks")}
          >
            Tracks
          </Link>
        </li>
        <li>
          <Link
            id={
              activePage === "Recents" ? "sidebar-link-active" : "sidebar-link"
            }
            to={{ pathname: "/recents" }}
            onClick={() => setActivePage("Recents")}
          >
            Tracks
          </Link>
        </li>
      </ul>
    </section>
  );
}
