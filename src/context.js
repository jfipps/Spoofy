import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./Components/useAuth";

//#region LocalStorage
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

//#endregion

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
  });

  const MillisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  //#region StateVariables
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
  const [scrollXRecents, setScrollXRecents] = useState(0);
  const [scrollEndRecents, setScrollEndRecents] = useState(false);
  const [trackURI, setTrackURI] = useState();
  const [artistID, setArtistID] = useState();
  const [artist, setArtist] = useState();
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [activePage, setActivePage] = useState("Artists");
  const [recentTracks, setRecentTracks] = useState([]);
  const [trackURIs, setTrackURIs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressMS, setProgressMS] = useState();
  const [trackLength, setTrackLength] = useState();
  const [shuffleState, setShuffleState] = useState();
  const [repeatState, setRepeatState] = useState();
  const [volume, setVolume] = useState();
  //#endregion

  //#region Inits
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
    console.log("Setting Access Token");
    spotifyWebApi.setAccessToken(access);
    console.log(spotifyWebApi);
    console.log("Setting Local");
    localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, access);
  }, [access, activeTab]);

  //#endregion

  //#region ArtistFunctions
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
  //#endregion

  //#region TrackFunctions
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

  const getRecentTracks = () => {
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

    // Get recently played tracks
    spotifyWebApi.getMyRecentlyPlayedTracks({ limit: 20 }).then(
      function (data) {
        setRecentTracks(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const GetCurrentTrack = () => {
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

    spotifyWebApi.getMyCurrentPlayingTrack().then(
      function (data) {
        setTrackLength(MillisToMinutesAndSeconds(data.body.item.duration_ms));
        setCurrentTrack(data.body.item);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  //#endregion

  //#region PlayerFunctions

  const GetUserVolume = () => {
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

    spotifyWebApi.getMyCurrentPlaybackState().then(
      function (data) {
        if (data.body) {
          setVolume(data.body.device.volume_percent);
        } else {
          console.log("Not Found");
          setIsPlaying(false);
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const GetPlaybackState = () => {
    if (!access) {
      if (localStorage.getItem(LOCALSTORAGE_KEYS.accessToken) !== null) {
        spotifyWebApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
      } else {
        console.log("No Access");
        return;
      }
    } else {
      spotifyWebApi.setAccessToken(access);
    }
    spotifyWebApi.getMyCurrentPlaybackState().then(
      function (data) {
        if (data.body) {
          setProgressMS(MillisToMinutesAndSeconds(data.body.progress_ms));
          setIsPlaying(data.body.is_playing);
          setShuffleState(data.body.shuffle_state);
          setRepeatState(data.body.repeat_state);
        } else {
          console.log("Not Found");
          setIsPlaying(false);
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const PlayTrack = (tracks) => {
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

    spotifyWebApi.play({ uris: trackURIs });
  };

  const PlayPause = (isPlaying) => {
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
    if (isPlaying) {
      spotifyWebApi.pause();
    } else {
      spotifyWebApi.play();
    }
  };

  const SkipSong = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
    setProgressMS("0:00");
    await delay(250);
    spotifyWebApi.skipToNext();
    await delay(250);
    GetCurrentTrack();
  };

  const PrevSong = async () => {
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
    if (progressMS === "0:00") {
      spotifyWebApi.skipToPrevious();
      await delay(500);
      GetCurrentTrack();
    } else {
      setProgressMS("0:00");
      await delay(500);
      spotifyWebApi.seek(0).then(
        function () {
          console.log("Restarting Song");
        },
        function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log("Something went wrong!", err);
        }
      );
    }
  };

  const SetShuffle = () => {
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
    spotifyWebApi.getMyCurrentPlaybackState().then(
      function (data) {
        if (data.body) {
          spotifyWebApi.setShuffle(!data.body.shuffle_state);
        } else {
          console.log("Not Found");
          setIsPlaying(false);
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const SetRepeat = () => {
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

    switch (repeatState) {
      case "off": {
        spotifyWebApi.setRepeat("context").then(
          function () {
            console.log("Repeat track.");
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log("Something went wrong!", err);
          }
        );
      }
      case "context": {
        spotifyWebApi.setRepeat("track").then(
          function () {
            console.log("Repeat one.");
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log("Something went wrong!", err);
          }
        );
      }
      case "track": {
        spotifyWebApi.setRepeat("off").then(
          function () {
            console.log("Repeat off.");
          },
          function (err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log("Something went wrong!", err);
          }
        );
      }
    }
  };

  const ChangeVolume = () => {
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

    spotifyWebApi.setVolume(volume).then(
      function () {
        console.log("Setting volume to " + volume);
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  };

  //#endregion

  //#region UseEffects
  // starts track current position counter
  useEffect(() => {
    const interval = setInterval(() => {
      if (!access) {
        setAccess(LOCALSTORAGE_VALUES.accessToken);
      }
      GetCurrentTrack();
      GetPlaybackState();
    }, 1000);
    return () => clearInterval(interval);
  }, [access, activeTab]);

  // grabs current track and volume for player information
  useEffect(() => {
    GetCurrentTrack();
    GetUserVolume();
  }, [access, activeTab]);

  // grabs top artist or top tracks on init load of page
  useEffect(() => {
    showTop();
    showTopTracks();
  }, [access, activeTab]);

  // grabs artist information on artist card click
  useEffect(() => {
    getArtist(artistID);
    getArtistAlbums(artistID);
    getArtistTopTracks(artistID);
  }, [artistID]);

  // init load for page navigation
  useEffect(() => {
    setDashLoading(true);
    GetCurrentTrack();
    GetPlaybackState();
  }, [activePage]);

  // changes volume
  useEffect(() => {
    ChangeVolume(volume);
  }, [volume]);

  //#endregion

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
        scrollXRecents,
        setScrollXRecents,
        scrollEndRecents,
        setScrollEndRecents,
        trackURI,
        setTrackURI,
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
        getRecentTracks,
        recentTracks,
        trackURIs,
        setTrackURIs,
        GetCurrentTrack,
        currentTrack,
        GetPlaybackState,
        isPlaying,
        setIsPlaying,
        PlayTrack,
        PlayPause,
        SkipSong,
        PrevSong,
        SetShuffle,
        shuffleState,
        progressMS,
        trackLength,
        repeatState,
        SetRepeat,
        volume,
        setVolume,
      }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
