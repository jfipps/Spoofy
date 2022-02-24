import React, { useContext, useEffect, useState } from "react";
import { SpoofyContext } from "../context";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "../CSS/Dashboard.css";

export default function TopContent() {
  const {
    topArtists,
    scrollXArtists,
    setScrollXArtists,
    scrollEndArtists,
    setScrollEndArtists,
  } = useContext(SpoofyContext);

  const [initRend, setInitRend] = useState(false);
  const scrollRow = document.getElementById("top-artists-row");

  useEffect(() => {
    if (!initRend) {
      setInitRend(true);
      return;
    }
    if (scrollRow.scrollWidth - scrollRow.offsetWidth < scrollXArtists) {
      setScrollXArtists(scrollRow.scrollWidth - scrollRow.offsetWidth);
    }
    if (scrollXArtists < 0) {
      setScrollXArtists(0);
    }
    scrollRow.scroll(scrollXArtists, 0);
  }, [scrollXArtists]);

  return (
    <section className="TopArtists">
      <h1 className="TopArtistsTitle">Top Artists</h1>
      <div className="ArrowDiv">
        <MdKeyboardArrowLeft
          size={24}
          onClick={() => setScrollXArtists(scrollXArtists - 550)}
          className="scrollBtn"
        ></MdKeyboardArrowLeft>
        <ul id="top-artists-row" className="TopArtistsRow">
          {/* Creates cards for Top Artists */}
          {topArtists.map((item, index) => {
            return (
              <li key={index}>
                <button className="ArtistCard">
                  <img
                    id="artist-image"
                    src={item.images[0].url}
                    alt={item.name}
                  />
                  <h2 id="artist-name">{item.name}</h2>
                  <h3 id="artist-followers">
                    Followers:{" "}
                    {item.followers.total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </h3>
                </button>
              </li>
            );
          })}
        </ul>
        <MdKeyboardArrowRight
          size={24}
          onClick={() => setScrollXArtists(scrollXArtists + 550)}
          className="scrollBtn"
        ></MdKeyboardArrowRight>
      </div>
    </section>
  );
}
