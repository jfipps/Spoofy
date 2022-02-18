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
import TopContent from "../Components/TopContent";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const {
    showSidebar,
    setShowSidebar,
    setApiCode,
    access,
    setAccess,
    showRecent,
  } = useContext(SpoofyContext);

  setAccess(useAuth(code));

  return (
    <>
      <section className="DashPage">
        <Sidebar></Sidebar>
        <section className="DashBody">
          <Container>
            <DashTimePeriod></DashTimePeriod>
            <TopContent></TopContent>
          </Container>
        </section>
      </section>
    </>
  );
}
