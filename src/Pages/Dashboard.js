import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";
import "../App.css";
import { Circles } from "react-loader-spinner";
import Sidebar from "../Components/Sidebar";
import DashTimePeriod from "../Components/DashTimePeriod";
import TopArtists from "../Components/TopArtists";
import TopArtistTable from "../Components/TopArtistTable";

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
    setActivePage,
  } = useContext(SpoofyContext);

  setAccess(useAuth(code));

  useEffect(() => {
    setActivePage("Artists");
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
              <TopArtists></TopArtists>
              {/* <TopTracks></TopTracks> */}
              <TopArtistTable></TopArtistTable>
            </div>
            {/* <div className="Player">
                <Player accessToken={access} />
              </div> */}
          </>
        )}
      </section>
    </section>
  );
}
