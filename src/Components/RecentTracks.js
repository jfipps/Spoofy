import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/RecentTracks.css";

export default function RecentTracks() {
  const {
    recentTracks,
    scrollXRecents,
    setScrollXRecents,
    scrollEndRecents,
    setScrollEndRecents,
    SkipSong,
    AddToQueue,
  } = useContext(SpoofyContext);

  const [initRend, setInitRend] = useState(false);
  const scrollRow = document.getElementById("recent-tracks-row");

  useEffect(() => {
    if (!initRend) {
      setInitRend(true);
      return;
    }
    if (scrollRow.scrollWidth - scrollRow.offsetWidth < scrollXRecents) {
      setScrollXRecents(scrollRow.scrollWidth - scrollRow.offsetWidth);
    }
    if (scrollXRecents < 0) {
      setScrollXRecents(0);
    }
    scrollRow.scroll(scrollXRecents, 0);
  }, [scrollXRecents]);

  const PlaySong = (uri) => {
    AddToQueue(uri);
    SkipSong();
  };

  return (
    <section className="RecentTracks">
      <h1 className="RecentTracksTitle">Recent Tracks</h1>
      <div className="ArrowDiv">
        <MdKeyboardArrowLeft
          size={24}
          onClick={() => setScrollXRecents(scrollXRecents - 550)}
          className="scrollBtn"
        ></MdKeyboardArrowLeft>
        <ul id="recent-tracks-row" className="RecentTracksRow">
          {/* Creates cards for Top Artists */}
          {recentTracks.map((track, index) => {
            return (
              <li key={index}>
                <button
                  className="TrackCard"
                  onClick={() => PlaySong(track.track.uri)}
                >
                  <img
                    id="album-image"
                    src={track.track.album.images[0].url}
                    alt={track.track.name}
                  />
                  <h2 id="track-name">{track.track.name}</h2>
                  <h3 id="track-artist">{track.track.artists[0].name}</h3>
                </button>
              </li>
            );
          })}
        </ul>
        <MdKeyboardArrowRight
          size={24}
          onClick={() => setScrollXRecents(scrollXRecents + 550)}
          className="scrollBtn"
        ></MdKeyboardArrowRight>
      </div>
    </section>
  );
}
