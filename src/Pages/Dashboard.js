import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect, useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { SpoofyContext } from "../context";
import SpotifyWebApi from "spotify-web-api-node";
import "../CSS/Dashboard.css";
import "../App.css";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";
import DashNav from "../Components/DashNav";
import DashTimePeriod from "../Components/DashTimePeriod";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const { showSidebar, setShowSidebar, setApiCode, setAccess, showRecent } =
    useContext(SpoofyContext);

  setAccess(useAuth(code));

  return (
    <>
      <DashNav></DashNav>
      <Sidebar show={showSidebar}></Sidebar>
      <section className="DashBody">
        <Container>
          <DashTimePeriod></DashTimePeriod>
        </Container>
      </section>
    </>
  );
}
