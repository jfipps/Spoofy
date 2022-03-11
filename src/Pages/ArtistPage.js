import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { useSearchParams } from "react-router-dom";
import "../CSS/Artist.css";
import Sidebar from "../Components/Sidebar";
import Player from "../Components/Player";
import ArtistHeader from "../Components/ArtistHeader";

export default function ArtistPage() {
  const { access, setAccess, artist, setArtistID } = useContext(SpoofyContext);

  setArtistID(new URLSearchParams(window.location.search).get("id"));

  // useEffect(() => {
  //   if (!artistName) return;
  //   getArtistAlbums(artistName);
  // }, []);

  // const uniqueNames = new Set();

  // const albums = artistAlbums
  //   .filter((album) => {
  //     if (album.album_type === "album") {
  //       return album;
  //     }
  //   })
  //   .filter((album) => {
  //     const isPresent = uniqueNames.has(album.name);
  //     uniqueNames.add(album.name);
  //     return !isPresent;
  //   });

  return (
    <>
      <section className="ArtistPage">
        <Sidebar></Sidebar>
        <section className="ArtistBody">
          <div className="Body">
            <ArtistHeader></ArtistHeader>
          </div>
          <div className="Player">
            <Player accessToken={access}></Player>
          </div>
        </section>
      </section>
    </>
  );
}
