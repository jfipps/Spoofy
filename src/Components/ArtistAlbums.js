import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistAlbums() {
  const { artistAlbums, getAlbumTracks, albumTracks } =
    useContext(SpoofyContext);

  console.log(albumTracks);

  return (
    <section className="ArtistAlbums">
      {artistAlbums.map((album, index) => {
        return (
          <>
            <img
              onClick={() => getAlbumTracks(album.id)}
              className="AlbumImage"
              src={album.images[0].url}
              alt={album.name}
            />
            {albumTracks[index].map((track, index) => {
              return <p>{track.name}</p>;
            })}
          </>
        );
      })}
    </section>
  );
}
