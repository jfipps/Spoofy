import React from "react";
import { useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { Circles } from "react-loader-spinner";
import Sidebar from "../Components/Sidebar";
import DashTimePeriod from "../Components/DashTimePeriod";
import Player from "../Components/Player";
import RecentTracksTable from "../Components/RecentTracksTable";
import "../CSS/Dashboard.css";

export default function Recents() {
  const {
    getRecentTracks,
    dashLoading,
    setDashLoading,
    setActivePage,
    access,
  } = useContext(SpoofyContext);

  useEffect(() => {
    getRecentTracks();
    setActivePage("Recents");
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
                <RecentTracksTable></RecentTracksTable>
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
