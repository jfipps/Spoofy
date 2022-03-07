import React, { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistHeader() {
  const { getArtist } = useContext(SpoofyContext);
  const artistID = new URLSearchParams(window.location.search).get("id");

  useEffect(() => {
    getArtist(artistID);
  }, [artistID]);

  return <div>{artistID}</div>;
}
