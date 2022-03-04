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
import DashTimePeriod from "../Components/DashTimePeriod";
import TopArtists from "../Components/TopArtists";
import TopTracks from "../Components/TopTracks";
import Player from "../Components/Player";

export default function Dashboard({ code }) {
  const {
    access,
    setAccess,
    apiCode,
    setApiCode,
    getCurrentPlayingTrack,
    loggedIn,
    setLoggedIn,
    logout,
  } = useContext(SpoofyContext);

  setAccess(useAuth(code));

  return (
    <>
      <section className="DashPage">
        <Sidebar></Sidebar>
        <section className="DashBody">
          <div className="Body">
            <DashTimePeriod></DashTimePeriod>
            <TopArtists></TopArtists>
            <TopTracks></TopTracks>
          </div>
          <div>
            <Player accessToken={access} />
          </div>
        </section>
      </section>
    </>
  );
}
