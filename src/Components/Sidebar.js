import React from "react";
import { useContext, useCallback } from "react";
import { SpoofyContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { FaHeadphonesAlt } from "react-icons/fa";
import "../CSS/Dashboard.css";

export default function Sidebar({ show }) {
  const { activePage, setActivePage, setLoading } = useContext(SpoofyContext);

  const navigate = useNavigate();

  const HandleLogout = useCallback(
    window.localStorage.clear(),
    () =>
      navigate(`/`, {
        replace: false,
      }),
    [navigate]
  );

  return (
    <section className="sidenav">
      <ul className="SidebarList">
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
            onClick={() => {
              setActivePage("Artists");
            }}
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
            onClick={() => {
              setActivePage("Tracks");
            }}
          >
            Tracks
          </Link>
        </li>
        <li className="RecentsLink">
          <Link
            id={
              activePage === "Recents" ? "sidebar-link-active" : "sidebar-link"
            }
            to={{ pathname: "/recents" }}
            onClick={() => setActivePage("Recents")}
          >
            Recents
          </Link>
        </li>
        <li className="LogoutLink">
          <Link
            id="sidebar-link"
            to={{ pathname: "/" }}
            onClick={() => HandleLogout()}
          >
            Logout
          </Link>
        </li>
      </ul>
    </section>
  );
}
