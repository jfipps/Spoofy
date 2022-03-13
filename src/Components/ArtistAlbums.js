import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistAlbums() {
  const { artistAlbums, getAlbumTracks, albumTracks } =
    useContext(SpoofyContext);

  console.log(albumTracks);

  return (
    <section className="ArtistAlbums">
      {artistAlbums && (
        <div className="Albums">
          {artistAlbums &&
            artistAlbums.map((album, index) => {
              return (
                <>
                  <img
                    className="AlbumImage"
                    src={album.images[0].url}
                    alt={album.name}
                  />
                  {/* {albumTracks && (
                    <div>
                      {albumTracks &&
                        albumTracks[index].map((track, index) => {
                          return <p>{track.name}</p>;
                        })}
                    </div>
                  )} */}
                </>
              );
            })}
        </div>
      )}
    </section>
  );
}
