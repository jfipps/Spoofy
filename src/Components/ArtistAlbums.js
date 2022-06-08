import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Artist.css";
import { Album } from "@mui/icons-material";

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

  console.log(artistAlbums);

  return (
    <section className="ArtistAlbums">
      <h1 className="AlbumTitle">Albums</h1>
      <div className="Albums">
        <table className="Table">
          {artistAlbums.map((album, index) => {
            if (album.album_group === "album") {
              return (
                <>
                  <tr className="AlbumTable">
                    <td className="AlbumCell">
                      <img src={album.images[2].url} alt={album.name} />
                      <div>
                        <h3>{album.name}</h3>
                        <h5>{album.release_date.split("-")[0]}</h5>
                      </div>
                    </td>
                  </tr>
                  <div
                  // className={
                  //   activeItem === index ? "SongListShown" : "SongListHidden"
                  // }
                  >
                    {albumTracks[index].map((currTrack) => {
                      return (
                        <tr>
                          <td>{currTrack.track_number}</td>
                          <td>{currTrack.name}</td>
                          <td>
                            {millisToMinutesAndSeconds(currTrack.duration_ms)}
                          </td>
                        </tr>
                      );
                    })}
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
