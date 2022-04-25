import React from "react";
import { useState, useEffect, useContext } from "react";
import useAuth from "../Components/useAuth";
import { SpoofyContext } from "../context";
import TopTracks from "../Components/TopTracks";
import TopTracksTable from "../Components/TopTracksTable";
import PlayerFooter from "../Components/PlayerFooter";
import "../CSS/Dashboard.css";
import "../App.css";
import { Circles } from "react-loader-spinner";
import Sidebar from "../Components/Sidebar";
import DashTimePeriod from "../Components/DashTimePeriod";
export default function Tracks({ code }) {
  const { access, showTopTracks, dashLoading, setDashLoading, setActivePage } =
    useContext(SpoofyContext);

  useEffect(() => {
    showTopTracks();
    setActivePage("Tracks");
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
            <PlayerFooter></PlayerFooter>
          </>
        )}
      </section>
    </section>
  );
}
