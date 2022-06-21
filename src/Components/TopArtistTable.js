import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/TopArtistTable.css";

export default function TopArtistTable() {
  const { topArtists, SkipSong, AddToQueue } = useContext(SpoofyContext);
  return (
    <section className="TopTable">
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
              <td>{index + 1}</td>
              <td>{artist.name}</td>
              <td>
                {artist.genres.map((genre, index) => {
                  if (index === artist.genres.length - 1) {
                    return genre;
                  }
                  return `${genre}, `;
                })}
              </td>
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
