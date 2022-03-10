import React, { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistHeader() {
  const { artist } = useContext(SpoofyContext);

  console.log(artist);

  return (
    <section className="ArtistHeader">
      <div>
        <img src={artist.images[0].url} alt={artist.name} />
        <h1>{artist.name}</h1>
      </div>
    </section>
  );
}
