import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpoofyContext } from "../context";

export default function Player({ accessToken }) {
  const { trackURI } = useContext(SpoofyContext);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackURI]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      styles={{
        bgColor: "#191414",
        color: "white",
        trackNameColor: "white",
        trackArtistColor: "white",
        sliderColor: "#1dbc55",
      }}
      token={accessToken}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackURI ? [trackURI] : []}
    />
  );
}
