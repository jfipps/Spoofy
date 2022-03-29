import React, { useState, useEffect, useContext } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { SpoofyContext } from "../context";

// map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expireTime: "expiresIn",
  timestamp: "currentTime",
};

// map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export default function Player({ accessToken }) {
  const { trackURI, setAccess } = useContext(SpoofyContext);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
    console.log(play);
  }, [trackURI]);

  if (!accessToken) {
    if (LOCALSTORAGE_VALUES.accessToken !== null) {
      setAccess(LOCALSTORAGE_VALUES.accessToken);
    } else {
      console.log("No Access");
      return null;
    }
  }
  if (!trackURI) {
    console.log("No Track");
    return null;
  }

  console.log(trackURI);

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
        if (!state.isPlaying && !trackURI) setPlay(false);
      }}
      play={play}
      uris={trackURI ? trackURI : []}
    />
  );
}
