import React, { useState, useContext, useEffect } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Player.css";
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
import { logDOM } from "@testing-library/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#beb5b3",
    },
  },
});

function PlayerFooter() {
  const {
    currentTrack,
    trackURIs,
    isPlaying,
    setIsPlaying,
    PlayPause,
    SkipSong,
    PrevSong,
    SetShuffle,
    shuffleState,
    GetPlaybackState,
    progressMS,
    trackLength,
  } = useContext(SpoofyContext);

  const [value, setValue] = useState(30);

  useEffect(() => {
    GetPlaybackState();
  }, []);

  const SetPlayPause = () => {
    setIsPlaying(!isPlaying);
    PlayPause(isPlaying);
  };

  // Changing State when volume increases/decreases

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Changes button to play on song click

  useEffect(() => {
    if (trackURIs) {
      setIsPlaying(true);
    }
  }, [trackURIs]);

  return (
    <>
      <div className="Phantom"></div>
      <div className="Footer">
        <div className="PlayerLeft">
          {currentTrack ? (
            <>
              <img
                className="PlayerAlbumImage"
                src={currentTrack.album.images[0].url}
                alt="Album Image"
              />
              <div className="PlayerInfo">
                <span id="player-track-name">{currentTrack.name}</span>
                <span id="player-artist-name">
                  {currentTrack.artists[0].name}
                </span>
              </div>
            </>
          ) : (
            <div className="Invis">
              <img
                className="PlayerAlbumImage"
                src={Humbug}
                alt="Album Image"
              />
              <div className="PlayerInfo">
                <span>Not Playing</span>
                <span id="player-artist-name">Not Playing</span>
              </div>
            </div>
          )}
        </div>
        <div className="PlayerCenter">
          <span id="progress-ms">{progressMS}</span>
          <BiShuffle
            className={shuffleState ? "PlayerButton On" : "PlayerButton"}
            size={28}
            onClick={() => SetShuffle()}
          ></BiShuffle>
          <BiSkipPrevious
            className="PlayerButton"
            size={40}
            onClick={() => PrevSong()}
          ></BiSkipPrevious>
          {isPlaying ? (
            <BiPause
              className="PlayerButton"
              size={40}
              onClick={() => SetPlayPause()}
            ></BiPause>
          ) : (
            <BiPlay
              className="PlayerButton"
              size={40}
              onClick={() => SetPlayPause()}
            ></BiPlay>
          )}
          <BiSkipNext
            className="PlayerButton"
            size={40}
            onClick={() => SkipSong()}
          ></BiSkipNext>
          <BiRepeat
            className="PlayerButton"
            size={28}
            onClick={() => GetPlaybackState()}
          ></BiRepeat>
          <span id="track-length">{trackLength}</span>
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
