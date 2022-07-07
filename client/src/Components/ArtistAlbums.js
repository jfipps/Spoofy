import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import "../CSS/Artist.css";

export default function ArtistAlbums({ albumTracks, toast }) {
  const {
    artistAlbums,
    getAlbumTracks,
    loading,
    setLoading,
    setTrackURI,
    AddToQueue,
    SkipSong,
  } = useContext(SpoofyContext);
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

  const PlaySong = (uri) => {
    AddToQueue(uri);
    SkipSong();
  };

  const QueueAdd = (uri, trackName, event) => {
    event.stopPropagation();
    toast(trackName);
    AddToQueue(uri);
  };

  return (
    <section className="ArtistAlbums">
      <h1 className="AlbumsHeader">Discography</h1>
      <div className="Albums">
        <table className="Table">
          {artistAlbums.map((album, index) => {
            if (album.album_group === "album") {
              return (
                <>
                  <tr className="AlbumTable">
                    <td
                      className="AlbumCell"
                      onClick={() => handleRotate(index)}
                    >
                      <img
                        className="AlbumImage"
                        src={album.images[2].url}
                        alt={album.name}
                      />
                      <div className="AlbumInfo">
                        <h3>{album.name}</h3>
                        <h5>{album.release_date.split("-")[0]}</h5>
                      </div>
                      <div
                        className={
                          activeItem === index
                            ? "ArrowSelect Rotate"
                            : "ArrowSelect"
                        }
                      >
                        <MdKeyboardArrowRight size={36}></MdKeyboardArrowRight>
                      </div>
                    </td>
                  </tr>
                  <div
                    className={
                      activeItem === index ? "SongListShown" : "SongListHidden"
                    }
                  >
                    <table className="AlbumTracks">
                      <tr>
                        <td>#</td>
                        <td>Track</td>
                        <td>Duration</td>
                      </tr>
                      {albumTracks[index].map((currTrack) => {
                        return (
                          <tr
                            className="TrackRow"
                            onClick={() => PlaySong(currTrack.uri)}
                          >
                            <td>{currTrack.track_number}</td>
                            <td>{currTrack.name}</td>
                            <td>
                              {millisToMinutesAndSeconds(currTrack.duration_ms)}
                            </td>
                            <td
                              className="AddQueue"
                              onClick={(event) =>
                                QueueAdd(currTrack.uri, currTrack.name, event)
                              }
                            >
                              <BiAddToQueue></BiAddToQueue>
                            </td>
                          </tr>
                        );
                      })}
                    </table>
                  </div>
                </>
              );
            }
          })}
        </table>
      </div>
    </section>
  );
}
