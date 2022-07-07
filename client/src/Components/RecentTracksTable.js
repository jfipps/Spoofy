import React from "react";
import { useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { BiAddToQueue } from "react-icons/bi";
import "../CSS/Dashboard.css";

export default function RecentTracksTable({ toast }) {
  const { recentTracks, SkipSong, AddToQueue } = useContext(SpoofyContext);

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
    <section className="TopTable">
      <table className="Table">
        <tr>
          <th>Track</th>
          <th>Album</th>
          <th>Artist</th>
          <th>Duration</th>
        </tr>
        {recentTracks.map((recent) => {
          return (
            <tr
              className="TrackTable"
              onClick={() => PlaySong(recent.track.uri)}
            >
              <td>{recent.track.name}</td>
              <td>{recent.track.album.name}</td>
              <td>{recent.track.artists[0].name}</td>
              <td>{millisToMinutesAndSeconds(recent.track.duration_ms)}</td>
              <td
                className="AddQueue"
                onClick={(event) => QueueAdd(recent.track.uri, recent. track.name, event)}
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
