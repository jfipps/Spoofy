import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Artist.css";

export default function ArtistAlbums({ albumTracks }) {
  const { artistAlbums, getAlbumTracks, loading, setLoading } =
    useContext(SpoofyContext);
  const [activeItem, setActiveItem] = useState();

  const handleRotate = (index) => {
    if (index === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };

  return (
    <section className="ArtistAlbums">
      <h1>Albums</h1>
      <div className="Albums">
        {artistAlbums && (
          <div className="AlbumList">
            {artistAlbums.map((album, index) => {
              return (
                <article key={index}>
                  <div className="AlbumHeader">
                    <img
                      className="AlbumImage"
                      src={album.images[0].url}
                      alt={album.name}
                    />
                    <div className="Divider">
                      <h2>{album.name}</h2>
                      <MdKeyboardArrowRight
                        size={30}
                        className={
                          activeItem === index
                            ? "ExpandIcon Rotate"
                            : "ExpandIcon"
                        }
                        onClick={() => handleRotate(index)}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      activeItem === index ? "SongListShown" : "SongListHidden"
                    }
                  >
                    {albumTracks[index].map((currAlbum) => {
                      return (
                        <h4 onClick={() => console.log(currAlbum.uri)}>
                          {currAlbum.name}
                        </h4>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
      )
    </section>
  );
}
