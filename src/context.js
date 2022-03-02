import React, { useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./Components/useAuth";

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [access, setAccess] = useState();
  const [activeTab, setActiveTab] = useState("short_term");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [scrollXArtists, setScrollXArtists] = useState(0);
  const [scrollEndArtists, setScrollEndArtists] = useState(false);
  const [scrollXTracks, setScrollXTracks] = useState(0);
  const [scrollEndTracks, setScrollEndTracks] = useState(false);
  const [trackURI, setTrackURI] = useState();

  useEffect(() => {
    if (!access) {
      return;
    }
    spotifyWebApi.setAccessToken(access);
  }, [access, activeTab]);

  const showTop = () => {
    if (!access) return;
    spotifyWebApi
      .getMyTopArtists({ time_range: activeTab })
      .then((data) => {
        //console.log(data.body.items);
        setTopArtists(data.body.items);
      })
      .catch((err) => {
        console.log("Failure " + err);
      });
  };

  const showTopTracks = () => {
    if (!access) return;
    spotifyWebApi
      .getMyTopTracks({ time_range: activeTab })
      .then((data) => {
        //console.log(data.body.items);
        setTopTracks(data.body.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentPlayingTrack = () => {
    if (!access) return;
    spotifyWebApi.getMyCurrentPlayingTrack().then(
      function (data) {
        console.log(data.body.item);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  useEffect(() => {
    showTop();
    showTopTracks();
    getCurrentPlayingTrack();
  }, [access, activeTab]);

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

  // spotifyWebApi
  //   .getMyTopTracks({ time_range: "long_term" })
  //   .then((data) => {
  //     console.log(data.body);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  return (
    <SpoofyContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        spotifyWebApi,
        access,
        setAccess,
        showTop,
        activeTab,
        setActiveTab,
        topArtists,
        topTracks,
        scrollXArtists,
        setScrollXArtists,
        scrollEndArtists,
        setScrollEndArtists,
        scrollXTracks,
        setScrollXTracks,
        scrollEndTracks,
        setScrollEndTracks,
        trackURI,
        setTrackURI,
        getCurrentPlayingTrack,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
