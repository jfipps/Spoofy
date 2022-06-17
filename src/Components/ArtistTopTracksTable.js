import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { ToastContainer, toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

function ArtistTopTracksTable({ toast }) {
  const { artistTopTracks, AddToQueue } = useContext(SpoofyContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const QueueAdd = (uri, trackName) => {
    toast(trackName);
    AddToQueue(uri);
  };

  return (
    <section className="TopTracksTable">
      <h1 className="ArtistTracksHeader">Top Tracks</h1>
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
              <td onClick={() => QueueAdd(track.uri, track.name)}>
                {index + 1}
              </td>
              <td onClick={() => QueueAdd(track.uri, track.name)}>
                {track.name}
              </td>
              <td onClick={() => QueueAdd(track.uri, track.name)}>
                {track.album.name}
              </td>
              <td onClick={() => QueueAdd(track.uri, track.name)}>
                {millisToMinutesAndSeconds(track.duration_ms)}
              </td>
              <td
                className="AddQueue"
                onClick={() => AddToQueue(track.uri, track.name)}
              >
                <BiAddToQueue></BiAddToQueue>
              </td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

export default ArtistTopTracksTable;
