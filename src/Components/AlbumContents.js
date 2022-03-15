import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";

export default function AlbumContents({ index }) {
  const { albumTracks } = useContext(SpoofyContext);
  if (!albumTracks[index]) {
    console.log("Not There");
  } else {
    console.log("There");
    console.log(Object.keys(albumTracks[index]).length);
  }
  return (
    <section className="Tracks">
      {albumTracks[index][0] ? <div>tracks</div> : <div>no tracks</div>}
    </section>
  );
}
