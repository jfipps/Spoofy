import React, { useContext } from "react";
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

  const slide = (shift) => {
    const test = document.getElementById("top-artists-row");
    test.scroll(scrollXArtists + shift, 0);
    setScrollXArtists(test.scrollLeft + shift);
    if (scrollXArtists < test.offsetWidth) {
      setScrollEndArtists(false);
    } else {
      setScrollXArtists(test.offsetWidth);
      setScrollEndArtists(true);
    }
  };

  return (
    <section className="TopArtists">
      <h1 className="TopArtistsTitle">Top Artists</h1>
      <div className="ArrowDiv">
        {setScrollXArtists !== 0 && (
          <MdKeyboardArrowLeft
            size={24}
            onClick={() => slide(-550)}
          ></MdKeyboardArrowLeft>
        )}
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
        {!scrollEndArtists && (
          <MdKeyboardArrowRight
            size={24}
            onClick={() => slide(550)}
          ></MdKeyboardArrowRight>
        )}
      </div>
    </section>
  );
}
