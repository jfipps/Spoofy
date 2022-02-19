import React, { useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";

export default function TopContent() {
  const { topArtists } = useContext(SpoofyContext);
  return (
    <section className="TopArtists">
      <h1 className="TopArtistsTitle">Top Artists</h1>
      <article className="TopArtistsRow">
        {/* Creates cards for Top Artists */}
        {topArtists.map((item, index) => {
          return (
            <button className="ArtistCard">
              <img id="artist-image" src={item.images[0].url} alt={item.name} />
              <h2 id="artist-name">{item.name}</h2>
              <h3 id="artist-followers">
                Followers:{" "}
                {item.followers.total.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </h3>
            </button>
          );
        })}
      </article>
    </section>
  );
}
