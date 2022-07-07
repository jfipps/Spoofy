import React from "react";
import { useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { Circles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/Sidebar";
import DashTimePeriod from "../Components/DashTimePeriod";
import PlayerFooter from "../Components/PlayerFooter";
import RecentTracks from "../Components/RecentTracks";
import RecentTracksTable from "../Components/RecentTracksTable";
import "../CSS/Dashboard.css";

export default function Recents() {
  const {
    getRecentTracks,
    recentTracks,
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

  const showToast = (trackName) => {
    toast('"' + trackName + '"' + " added to queue");
  };

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
                <RecentTracks></RecentTracks>
                <RecentTracksTable toast={showToast}></RecentTracksTable>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <PlayerFooter></PlayerFooter>
            </>
          )}
        </section>
      </section>
    </>
  );
}
