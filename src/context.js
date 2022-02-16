import React, { useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./Components/useAuth";

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [apiCode, setApiCode] = useState();
  const [access, setAccess] = useState();

  useEffect(() => {
    if (!access) {
      return;
    }
    spotifyWebApi.setAccessToken(access);
    console.log(spotifyWebApi);
  }, [access]);

  const showRecent = () => {
    if (!access) return;
    spotifyWebApi
      .getMyRecentlyPlayedTracks({ limit: 20 })
      .then((data) => {
        console.log("20 most current tracks played : ");
        data.body.items.forEach((item) =>
          console.log(item.track.name + " by " + item.track.artists[0].name)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    spotifyWebApi
      .getMyTopArtists({ time_range: "long_term" })
      .then((data) => {
        console.log("Top Artists: ");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SpoofyContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        spotifyWebApi,
        setApiCode,
        setAccess,
        showRecent,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
