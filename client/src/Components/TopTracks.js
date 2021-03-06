import React, { useContext, useEffect, useState } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/TopTracks.css";

export default function TopTracks() {
  const {
    topTracks,
    scrollXTracks,
    setScrollXTracks,
    scrollEndTracks,
    setScrollEndTracks,
    trackURI,
    setTrackURI,
    SkipSong,
    AddToQueue,
  } = useContext(SpoofyContext);

  const [initRend, setInitRend] = useState(false);
  const scrollRow = document.getElementById("top-tracks-row");

  const PlaySong = (uri) => {
    AddToQueue(uri);
    SkipSong();
  };

  useEffect(() => {
    if (!initRend) {
      setInitRend(true);
      return;
    }
    if (scrollRow.scrollWidth - scrollRow.offsetWidth < scrollXTracks) {
      setScrollXTracks(scrollRow.scrollWidth - scrollRow.offsetWidth);
    }
    if (scrollXTracks < 0) {
      setScrollXTracks(0);
    }
    scrollRow.scroll(scrollXTracks, 0);
  }, [scrollXTracks]);

  return (
    <section className="TopTracks">
      <h1 className="TopTracksTitle">Top Tracks</h1>
      <div className="ArrowDiv">
        <MdKeyboardArrowLeft
          onClick={() => setScrollXTracks(scrollXTracks - 550)}
          size={24}
          className="scrollBtn"
        ></MdKeyboardArrowLeft>
        <ul id="top-tracks-row" className="TopTracksRow">
          {/* Creates cards for Top Tracks */}
          {topTracks.map((track, index) => {
            return (
              <li key={index}>
                <button
                  className="TrackCard"
                  onClick={() => PlaySong(track.uri)}
                >
                  <img
                    id="album-image"
                    src={track.album.images[0].url}
                    alt={track.album.name}
                  />
                  <h2 id="track-name">{track.name}</h2>
                  <h3 id="track-artist">{track.artists[0].name}</h3>
                </button>
              </li>
            );
          })}
        </ul>
        <MdKeyboardArrowRight
          onClick={() => setScrollXTracks(scrollXTracks + 550)}
          size={24}
          className="scrollBtn"
        ></MdKeyboardArrowRight>
      </div>
    </section>
  );
}
