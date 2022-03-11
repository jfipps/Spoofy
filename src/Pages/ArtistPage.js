import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { useSearchParams } from "react-router-dom";
import "../CSS/Artist.css";
import Sidebar from "../Components/Sidebar";
import Player from "../Components/Player";
import ArtistHeader from "../Components/ArtistHeader";
import ArtistAlbums from "../Components/ArtistAlbums";

export default function ArtistPage() {
  const { access, setAccess, artist, setArtistID } = useContext(SpoofyContext);

  setArtistID(new URLSearchParams(window.location.search).get("id"));

  return (
    <>
      <section className="ArtistPage">
        <Sidebar></Sidebar>
        <section className="ArtistBody">
          <div className="Body">
            <ArtistHeader></ArtistHeader>
            <ArtistAlbums></ArtistAlbums>
          </div>
          <div className="Player">
            <Player accessToken={access}></Player>
          </div>
        </section>
      </section>
    </>
  );
}
