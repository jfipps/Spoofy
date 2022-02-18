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
  const [activeTab, setActiveTab] = useState("oneMonth");
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (!access) {
      console.log("No API");
      return;
    }
    spotifyWebApi.setAccessToken(access);
    console.log(spotifyWebApi);
  }, [access]);

  const showRecent = () => {
    if (!access) return;
    // spotifyWebApi
    //   .getMyRecentlyPlayedTracks({ limit: 20 })
    //   .then((data) => {
    //     console.log("20 most current tracks played : ");
    //     data.body.items.forEach((item) =>
    //       console.log(item.track.name + " by " + item.track.artists[0].name)
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    spotifyWebApi
      .getMyTopArtists({ time_range: "short_term" })
      .then((data) => {
        console.log(data.body.items);
        setTopArtists(data.body.items);
      })
      .catch((err) => {
        console.log("Failure" + err);
      });
  };

  useEffect(() => {
    showRecent();
  }, [access]);

  // useEffect(() => {
  //   if (!search) return setSearchResults([]);
  //   if (!accessToken) return;
  //   let cancel = false;

  //   spotifyWebApi.searchTracks(search).then((res) => {
  //     if (cancel) return;
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallAlbumImg = track.album.images.reduce(
  //

  return (
    <SpoofyContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        spotifyWebApi,
        setApiCode,
        access,
        setAccess,
        showRecent,
        activeTab,
        setActiveTab,
        topArtists,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
