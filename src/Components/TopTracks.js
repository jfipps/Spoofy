import React, { useContext } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Dashboard.css";

export default function TopTracks() {
  const {
    topTracks,
    scrollXTracks,
    setScrollXTracks,
    scrollEndTracks,
    setScrollEndTracks,
  } = useContext(SpoofyContext);

  const slide = (shift) => {
    const test = document.getElementById("top-tracks-row");
    console.log(test.scrollWidth);
    test.scroll(scrollXTracks + shift, 0);
    setScrollXTracks(test.scrollLeft + shift);
  };

  return (
    <section className="TopTracks">
      <h1 className="TopTracksTitle">Top Tracks</h1>
      <div className="ArrowDiv">
        <MdKeyboardArrowLeft
          onClick={() => slide(-550)}
          size={24}
        ></MdKeyboardArrowLeft>
        <ul id="top-tracks-row" className="TopTracksRow">
          {/* Creates cards for Top Tracks */}
          {topTracks.map((item, index) => {
            return (
              <li key={index}>
                <button className="TrackCard">
                  <img
                    id="album-image"
                    src={item.album.images[0].url}
                    alt={item.album.name}
                  />
                  <h2 id="track-name">{item.name}</h2>
                  <h3 id="track-artist">{item.artists[0].name}</h3>
                </button>
              </li>
            );
          })}
        </ul>
        <MdKeyboardArrowRight
          onClick={() => slide(550)}
          size={24}
        ></MdKeyboardArrowRight>
      </div>
    </section>
  );
}
