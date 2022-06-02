import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";

function ArtistTopTracksTable() {
  const { artistTopTracks } = useContext(SpoofyContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <section className="TopTracksTable">
      <table className="Table">
        <tr>
          <th>Rank</th>
          <th>Track</th>
          <th>Album</th>
          <th>Duration</th>
        </tr>
        {artistTopTracks.map((track, index) => {
          return (
            <tr className="TrackTable">
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>{track.album.name}</td>
              <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export default ArtistTopTracksTable;
