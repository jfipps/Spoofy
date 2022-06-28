import React from "react";
import { useState, useEffect, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SpoofyContext } from "../context";
import "../CSS/TopArtistTable.css";

export default function TopArtistTable() {
  const { topArtists, SkipSong, AddToQueue } = useContext(SpoofyContext);

  const navigate = useNavigate();
  const HandleClick = useCallback(
    (name, id) =>
      navigate(`/artistpage/?name=${name}&id=${id}`, {
        replace: false,
      }),
    [navigate]
  );

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
            <tr
              className="TopArtistTable"
              onClick={() => HandleClick(artist.name, artist.id)}
            >
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
