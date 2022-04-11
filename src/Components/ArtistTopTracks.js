import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistTopTracks() {
  const { artistTopTracks } = useContext(SpoofyContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <section className="ArtistTopTracks">
      <h1>Top Tracks</h1>
      <div className="Tracks">
        {artistTopTracks.map((track) => {
          return (
            <article className="TopTrack" onClick={() => console.log(track)}>
              <img
                className="AlbumImage"
                onClick={() => console.log(track)}
                src={track.album.images[1].url}
                alt={track.name}
              />
              <h2 className="TopTrackName">
                {track.name} - {millisToMinutesAndSeconds(track.duration_ms)}
              </h2>
            </article>
          );
        })}
      </div>
    </section>
  );
}
