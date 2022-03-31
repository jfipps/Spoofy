import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Artist.css";

export default function ArtistAlbums({ albumTracks }) {
  const { artistAlbums, getAlbumTracks, loading, setLoading, setTrackURI } =
    useContext(SpoofyContext);
  const [activeItem, setActiveItem] = useState();

  const handleRotate = (index) => {
    if (index === activeItem) {
      setActiveItem(null);
    } else {
      setActiveItem(index);
    }
  };

  const addAlbumToPlayer = (album) => {
    let tracklist = [];
    album.map((track) => {
      tracklist.push(track.uri);
    });
    setTrackURI(tracklist);
  };

  const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <section className="ArtistAlbums">
      <h1 className="AlbumTitle">Albums</h1>
      <div className="Albums">
        {artistAlbums && (
          <div className="AlbumList">
            {artistAlbums.map((album, index) => {
              return (
                <article key={index}>
                  <div className="AlbumHeader">
                    <img
                      onClick={() => addAlbumToPlayer(albumTracks[index])}
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
                        <h4 className="AlbumTrack">
                          {currAlbum.track_number} - {currAlbum.name} -{" "}
                          {millisToMinutesAndSeconds(currAlbum.duration_ms)}
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
