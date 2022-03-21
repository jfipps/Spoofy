import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";

export default function TopArtistTable() {
  const { topArtists } = useContext(SpoofyContext);
  console.log(topArtists);
  return (
    <section className="TopArtistTable">
      <table className="Table">
        <tr>
          <th>Rank</th>
          <th>Artist</th>
          <th>Genres</th>
          <th>Followers</th>
        </tr>
        {topArtists.map((artist, index) => {
          return (
            <tr>
              <td>{index}</td>
              <td>{artist.name}</td>
              <td>{`${artist.genres[0]}, ${artist.genres[1]}, ${artist.genres[2]}`}</td>
              <td>
                {artist.followers.total.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}
