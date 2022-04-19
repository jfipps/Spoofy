import React, { useState } from "react";
import "../CSS/Dashboard.css";
import Humbug from "../Resources/Humbug.jpg";
import Slider from "@material-ui/core/Slider";

// icons
import {
  BiPlay,
  BiSkipPrevious,
  BiSkipNext,
  BiShuffle,
  BiRepeat,
  BiPause,
} from "react-icons/bi";

function PlayerFooter() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(30);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying);
  };

  // Changing State when volume increases/decreases
  const changeVolume = (newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="Phantom"></div>
      <div className="Footer">
        <div className="PlayerLeft">
          <img className="PlayerAlbumImage" src={Humbug} alt="Humbug" />
          <div className="PlayerInfo">
            <span>Song Name</span>
            <span id="player-artist-name">Artist Name</span>
          </div>
        </div>
        <div className="PlayerCenter">
          <BiShuffle className="PlayerButton" size={28}></BiShuffle>
          <BiSkipPrevious className="PlayerButton" size={40}></BiSkipPrevious>
          {isPlaying ? (
            <BiPause
              className="PlayerButton"
              size={40}
              onClick={() => PlayPause()}
            ></BiPause>
          ) : (
            <BiPlay
              className="PlayerButton"
              size={40}
              onClick={() => PlayPause()}
            ></BiPlay>
          )}
          <BiSkipNext className="PlayerButton" size={40}></BiSkipNext>
          <BiRepeat className="PlayerButton" size={28}></BiRepeat>
        </div>
        <div className="PlayerLeft">
          <Slider value={value} onChange={changeVolume} />
        </div>
      </div>
    </>
  );
}

export default PlayerFooter;
