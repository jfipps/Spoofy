import React, { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistHeader() {
  const { artist, artistAlbums, getArtistTopTracks } =
    useContext(SpoofyContext);

  return (
    <section className="ArtistHeader">
      <div className="ImageDiv">
        {artist && (
          <img
            onClick={() => getArtistTopTracks(artist.id)}
            className="ArtistImage"
            src={artist.images[0].url}
            alt={artist.name}
          />
        )}
      </div>
      <div className="NameDiv">
        {artist && <h1 className="ArtistName">{artist.name}</h1>}
        {artist && (
          <h5>
            Followers:{" "}
            {artist.followers.total.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </h5>
        )}
      </div>
    </section>
  );
}
