import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { useSearchParams } from "react-router-dom";

export default function ArtistPage() {
  const { getArtistAlbums, artistAlbums } = useContext(SpoofyContext);
  const artistName = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    if (!artistName) return;
    getArtistAlbums(artistName);
  }, []);

  return (
    <>
      {artistAlbums.map((item) => {
        return (
          <h1>
            {item.name} {item.album_type}
          </h1>
        );
      })}
    </>
  );
}
