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

  // state variables
  const [loading, setLoading] = useState(true);
  const [dashLoading, setDashLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState();
  const [access, setAccess] = useState();
  const [activeTab, setActiveTab] = useState("short_term");
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [scrollXArtists, setScrollXArtists] = useState(0);
  const [scrollEndArtists, setScrollEndArtists] = useState(false);
  const [scrollXTracks, setScrollXTracks] = useState(0);
  const [scrollEndTracks, setScrollEndTracks] = useState(false);
  const [trackURI, setTrackURI] = useState();
  const [artistID, setArtistID] = useState();
  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [activePage, setActivePage] = useState("Artists");

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
        setTopArtists(data.body.items);
      })
      .catch((err) => {
        console.log("Failure " + err);
      });
  };

  const showTopTracks = () => {
    if (!access) {
      if (LOCALSTORAGE_VALUES.accessToken !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    } else {
      spotifyWebApi.setAccessToken(access);
    }
    spotifyWebApi
      .getMyTopTracks({ time_range: activeTab })
      .then((data) => {
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
    } else {
      spotifyWebApi.setAccessToken(access);
    }
    spotifyWebApi.getArtistAlbums(id, { limit: 50 }).then(
      function (data) {
        const uniqueNames = new Set();
        const albums = data.body.items
          .filter((album) => {
            if (album.album_type === "album") {
              return album;
            }
          })
          .filter((album) => {
            const isPresent = uniqueNames.has(album.name);
            uniqueNames.add(album.name);
            return !isPresent;
          });
        setArtistAlbums(albums);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  const getAlbumTracks = (id) => {
    const tracks = [];
    if (!access) {
      if (LOCALSTORAGE_VALUES.accessToken !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    } else {
      spotifyWebApi.setAccessToken(access);
    }
    spotifyWebApi.getAlbumTracks(id).then(
      function (data) {
        data.body.items.forEach((item) => tracks.push(item));
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    return tracks;
  };

  const getArtist = (id) => {
    if (!access) {
      if (LOCALSTORAGE_VALUES.accessToken !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    } else {
      spotifyWebApi.setAccessToken(access);
    }
    spotifyWebApi.getArtist(id).then(
      function (data) {
        setArtist(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  const getArtistTopTracks = (id) => {
    if (!access) {
      if (LOCALSTORAGE_VALUES.accessToken !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    } else {
      spotifyWebApi.setAccessToken(access);
    }

    // Get an artist's top tracks
    spotifyWebApi.getArtistTopTracks(id, "US").then(
      function (data) {
        setArtistTopTracks(data.body.tracks);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  useEffect(() => {
    showTop();
    showTopTracks();
  }, [access, activeTab]);

  useEffect(() => {
    getArtist(artistID);
    getArtistAlbums(artistID);
    getArtistTopTracks(artistID);
  }, [artistID]);

  useEffect(() => {
    setDashLoading(true);
  }, [activePage]);

  return (
    <SpoofyContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        spotifyWebApi,
        access,
        setAccess,
        showTop,
        showTopTracks,
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
        getArtist,
        artist,
        setArtist,
        artistID,
        setArtistID,
        getAlbumTracks,
        loading,
        setLoading,
        dashLoading,
        setDashLoading,
        getArtistTopTracks,
        artistTopTracks,
        activePage,
        setActivePage,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
