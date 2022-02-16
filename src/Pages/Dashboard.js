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

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const { showSidebar, setShowSidebar, setApiCode, setAccess, showRecent } =
    useContext(SpoofyContext);

  setAccess(useAuth(code));

  // useEffect(() => {
  //   if (!search) return setSearchResults([]);
  //   if (!accessToken) return;
  //   let cancel = false;

  //   spotifyWebApi.searchTracks(search).then((res) => {
  //     if (cancel) return;
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallAlbumImg = track.album.images.reduce(
  //

  return (
    <>
      <DashNav></DashNav>
      <Sidebar show={showSidebar}></Sidebar>
      <section className="DashBody">
        <Container>
          <h1>{showSidebar.toString()}</h1>
          <button onClick={() => showRecent()}>Click Me</button>
        </Container>
      </section>
    </>
  );
}
