import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect, useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { SpoofyContext } from "../context";
import SpotifyWebApi from "spotify-web-api-node";
import "../CSS/Dashboard.css";
import "../App.css";
import { FaBars } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
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
    dashLoading,
    setDashLoading,
  } = useContext(SpoofyContext);

  setAccess(useAuth(code));

  useEffect(() => {
    setTimeout(() => {
      setDashLoading(false);
    }, 1000);
    clearTimeout();
  }, []);

  return (
    <>
      <section className="DashPage">
        <Sidebar></Sidebar>
        <section className="DashBody">
          {dashLoading ? (
            <div className="Loader">
              <Circles type="Circles" color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            <>
              <div className="Body">
                <DashTimePeriod></DashTimePeriod>
                <TopArtists></TopArtists>
                <TopTracks></TopTracks>
              </div>
              <div className="Player">
                <Player accessToken={access} />
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
}
