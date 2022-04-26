import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";

export default function TopTracksTable() {
  const { topTracks, trackURIs, setTrackURIs, PlayTracks } =
    useContext(SpoofyContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const TrackClick = (track) => {
    setTrackURIs(track.uri);
  };

  return (
    <section className="TopTable">
      <table className="Table">
        <tr>
          <th>Rank</th>
          <th>Track</th>
          <th>Album</th>
          <th>Artist</th>
          <th>Duration</th>
        </tr>
        {topTracks.map((track, index) => {
          return (
            <tr onClick={() => TrackClick(track)}>
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>{track.album.name}</td>
              <td>{track.artists[0].name}</td>
              <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}
