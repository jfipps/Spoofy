import React from "react";
import { useState, useEffect, useContext } from "react";
import useAuth from "../Components/useAuth";
import { SpoofyContext } from "../context";
import TopTracks from "../Components/TopTracks";
import TopTracksTable from "../Components/TopTracksTable";
import Player from "../Components/Player";
import "../CSS/Dashboard.css";
import "../App.css";
import { Circles } from "react-loader-spinner";
import Sidebar from "../Components/Sidebar";
import DashTimePeriod from "../Components/DashTimePeriod";
export default function Tracks({ code }) {
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
              <TopTracks></TopTracks>
              <TopTracksTable></TopTracksTable>
            </div>
            <div className="Player">
              <Player accessToken={access} />
            </div>
          </>
        )}
      </section>
    </section>
  );
}
