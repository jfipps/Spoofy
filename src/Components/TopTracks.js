import React, { useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";

export default function TopTracks() {
  const { topTracks } = useContext(SpoofyContext);
  return (
    <section className="TopTracks">
      <h1 className="TopTracksTitle">Top Tracks</h1>
      <article className="TopTracksRow">
        {/* Creates cards for Top Tracks */}
        {topTracks.map((item, index) => {
          return (
            <button className="TrackCard">
              <img
                id="album-image"
                src={item.album.images[0].url}
                alt={item.album.name}
              />
              <h2 id="track-name">{item.name}</h2>
              <h3 id="track-artist">{item.artists[0].name}</h3>
            </button>
          );
        })}
      </article>
    </section>
  );
}
