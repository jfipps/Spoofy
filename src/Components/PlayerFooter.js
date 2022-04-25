import React, { useState, useContext, useEffect } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Dashboard.css";
import Humbug from "../Resources/Humbug.jpg";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// icons
import {
  BiPlay,
  BiSkipPrevious,
  BiSkipNext,
  BiShuffle,
  BiRepeat,
  BiPause,
} from "react-icons/bi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#beb5b3",
    },
  },
});

function PlayerFooter() {
  const { currentTrack } = useContext(SpoofyContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const [value, setValue] = useState(30);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying);
    console.log(currentTrack);
  };

  // Changing State when volume increases/decreases

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="Phantom"></div>
      <div className="Footer">
        <div className="PlayerLeft">
          <img
            className="PlayerAlbumImage"
            src={currentTrack.album.images[0].url}
            alt="Album Image"
          />
          <div className="PlayerInfo">
            <span>{currentTrack.name}</span>
            <span id="player-artist-name">{currentTrack.artists[0].name}</span>
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
          <Box sx={{ width: 200 }}>
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <VolumeDown />
              <Slider
                theme={theme}
                aria-label="Volume"
                value={value}
                onChange={handleChange}
              />
              <VolumeUp />
            </Stack>
          </Box>
        </div>
      </div>
    </>
  );
}

export default PlayerFooter;
