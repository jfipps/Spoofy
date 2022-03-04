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

  const uniqueNames = new Set();

  const albums = artistAlbums
    .filter((album) => {
      if (album.album_type === "album") {
        return album;
      }
    })
    .filter((album) => {
      const isPresent = uniqueNames.has(album.name);
      uniqueNames.add(album.name);
      return !isPresent;
    });

  return (
    <>
      {albums.map((item) => {
        return (
          <h1>
            {item.name} {item.artists[0].name}
          </h1>
        );
      })}
    </>
  );
}
