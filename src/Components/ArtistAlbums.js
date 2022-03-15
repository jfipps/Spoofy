import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Artist.css";

export default function ArtistAlbums({ albumTracks }) {
  const { artistAlbums, getAlbumTracks, loading, setLoading } =
    useContext(SpoofyContext);
  const [rotate, setRotate] = useState(false);

  const handleRotate = () => {
    setRotate(!rotate);
  };

  return (
    <section className="ArtistAlbums">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="Albums">
          <div className="Head">
            <h1>Albums </h1>
            <MdKeyboardArrowRight
              size={30}
              className={rotate ? "ExpandIcon Rotate" : "ExpandIcon"}
              onClick={handleRotate}
            />
          </div>
          {artistAlbums && (
            <div className={rotate ? "AlbumList Expanded" : "AlbumList"}>
              {artistAlbums.map((album, index) => {
                return (
                  <article key={index}>
                    <img
                      className="AlbumImage"
                      src={album.images[0].url}
                      alt={album.name}
                    />
                    {albumTracks[index].map((currAlbum) => {
                      return (
                        <h2 onClick={() => console.log(currAlbum.uri)}>
                          {currAlbum.name}
                        </h2>
                      );
                    })}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
