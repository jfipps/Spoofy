import React, { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistHeader() {
  const { artist, artistAlbums } = useContext(SpoofyContext);

  console.log("Albums: ");
  console.log(artistAlbums);

  return (
    <section className="ArtistHeader">
      <div>
        {artist && (
          <img
            className="ArtistImage"
            src={artist.images[0].url}
            alt={artist.name}
          />
        )}
      </div>
      <div>
        {artist && <h1>{artist.name}</h1>}
        {artist && (
          <h3>
            Followers:{" "}
            {artist.followers.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </h3>
        )}
        {artistAlbums.map((album) => {
          return <h1>{album.name}</h1>;
        })}
      </div>
    </section>
  );
}
