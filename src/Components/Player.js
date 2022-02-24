import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken }) {
  const [play, setPlay] = useState(false);

  // useEffect(() => {
  //   setPlay(true);
  // }, [trackUri]);

  if (!accessToken) return null;

  return <SpotifyPlayer styles={{ bgColor: "none" }} token={accessToken} />;
}
