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
import TopArtists from "../Components/TopArtists";
import TopTracks from "../Components/TopTracks";
import Player from "../Components/Player";

export default function Dashboard({ code }) {
  const { access, setAccess, apiCode, setApiCode, getCurrentPlayingTrack } =
    useContext(SpoofyContext);

  const accessToken = useAuth(code);

  useEffect(() => {
    if (localStorage.getItem("loggedIn") === "true") {
      console.log("Logged In Prev");
      setAccess(localStorage.getItem("accessToken"));
    } else {
      console.log("Not Logged In");
      setAccess(accessToken);
    }
  }, [accessToken]);

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
