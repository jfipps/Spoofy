import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { ToastContainer, toast } from "react-toastify";
import { BiAddToQueue } from "react-icons/bi";
import "react-toastify/dist/ReactToastify.css";

function ArtistTopTracksTable({ toast }) {
  const { artistTopTracks, AddToQueue, SkipSong } = useContext(SpoofyContext);

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  const PlaySong = (uri) => {
    AddToQueue(uri);
    SkipSong();
  };

  const QueueAdd = (uri, trackName, event) => {
    event.stopPropagation();
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
            <tr className="TrackTable" onClick={() => PlaySong(track.uri)}>
              <td>{index + 1}</td>
              <td>{track.name}</td>
              <td>{track.album.name}</td>
              <td>{millisToMinutesAndSeconds(track.duration_ms)}</td>
              <td
                className="AddQueue"
                onClick={(event) => QueueAdd(track.uri, track.name, event)}
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
