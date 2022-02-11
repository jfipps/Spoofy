import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect, useContext } from "react";
import { Container, Form, Navbar } from "react-bootstrap";
import { SpoofyContext } from "../context";
import SpotifyWebApi from "spotify-web-api-node";
import "../CSS/Dashboard.css";
import "../App.css";
import { FaBars } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const { showSidebar, setShowSidebar } = useContext(SpoofyContext);

  const accessToken = useAuth(code);
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [playingTrack, setPlayingTrack] = useState();

  // const chooseTrack = (track) => {
  //   setPlayingTrack(track);
  //   setSearch("");
  // };

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyWebApi.setAccessToken(accessToken);
  }, [accessToken]);

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

  const showRecent = () => {
    if (!accessToken) return;
    spotifyWebApi
      .getMyRecentlyPlayedTracks({ limit: 20 })
      .then((data) => {
        console.log("20 most current tracks played : ");
        data.body.items.forEach((item) =>
          console.log(item.track.name + " by " + item.track.artists[0].name)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    spotifyWebApi
      .getMyTopArtists({ time_range: "long_term" })
      .then((data) => {
        console.log("Top Artists: ");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar id="navbar" className="DashNav">
        <div className="NavbarStart">
          <button id="spoofy-link" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars size={24}></FaBars>
          </button>
        </div>
        <div className="NavbarEnd">
          <button>Home</button>
          <button>Logout</button>
        </div>
      </Navbar>
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
