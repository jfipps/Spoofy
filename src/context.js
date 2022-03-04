import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./Components/useAuth";

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

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState();
  const [access, setAccess] = useState();
  const [activeTab, setActiveTab] = useState("short_term");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [scrollXArtists, setScrollXArtists] = useState(0);
  const [scrollEndArtists, setScrollEndArtists] = useState(false);
  const [scrollXTracks, setScrollXTracks] = useState(0);
  const [scrollEndTracks, setScrollEndTracks] = useState(false);
  const [trackURI, setTrackURI] = useState();

  let nav = useNavigate();

  // checks to see if expiresIn time for API has been reached
  useEffect(() => {
    if (
      Math.floor(Date.now() / 1000) - LOCALSTORAGE_VALUES.timestamp <
      LOCALSTORAGE_VALUES.expireTime
    ) {
      spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
    }
  }, []);

  useEffect(() => {
    if (loggingOut) {
      localStorage.clear();
      setLoggedIn(false);
      nav("/");
      console.log("Logging Out");
    }
  }, [loggingOut]);

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
        console.log(data.body.items);
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

  const getArtistAlbums = (id) => {
    if (!access) {
      if (LOCALSTORAGE_VALUES.accessToken !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    }
    // spotifyWebApi.getArtist("7Ln80lUS6He07XvHI8qqHH").then(
    //   function (data) {
    //     console.log("Artist information", data.body);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );
    spotifyWebApi.getArtistAlbums(id).then(
      function (data) {
        setArtistAlbums(data.body.items);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  useEffect(() => {
    showTop();
    showTopTracks();
    getArtistAlbums();
    //getCurrentPlayingTrack();
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
        loggedIn,
        setLoggedIn,
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
        loggingOut,
        setLoggingOut,
        getArtistAlbums,
        artistAlbums,
        setArtistAlbums,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
