import React, { useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";

export default function TopContent() {
  const { topArtists } = useContext(SpoofyContext);
  return (
    <article className="TopArtists">
      {topArtists.map((item, index) => {
        return (
          <div className="ArtistCard">
            <img src={item.images[0].url} alt={item.name} />
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </article>
  );
}
