import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistTopTracks() {
  const { artistTopTracks } = useContext(SpoofyContext);
  return (
    <section className="ArtistTopTracks">
      <h1>Top Tracks</h1>
      <div className="Tracks">
        {artistTopTracks.map((track) => {
          return (
            <article className="TopTrack">
              <img src={track.album.images[2].url} alt={track.name} />
              <h2>{track.name}</h2>
            </article>
          );
        })}
      </div>
    </section>
  );
}
