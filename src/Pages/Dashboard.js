import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import TrackSearchResult from "../Components/TrackSearchResult";
import Player from "../Components/Player";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  // const [search, setSearch] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [playingTrack, setPlayingTrack] = useState();

  // const chooseTrack = (track) => {
  //   setPlayingTrack(track);
  //   setSearch("");
  // };

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyWebApi.setAccessToken(accessToken);
  }, [accessToken]);

  // useEffect(() => {
  //   if (!search) return setSearchResults([]);
  //   if (!accessToken) return;
  //   let cancel = false;

  //   spotifyWebApi.searchTracks(search).then((res) => {
  //     if (cancel) return;
  //     setSearchResults(
  //       res.body.tracks.items.map((track) => {
  //         const smallAlbumImg = track.album.images.reduce(
  //           (smallest, current) => {
  //             if (current.height < smallest.height) {
  //               return current;
  //             }
  //             return smallest;
  //           },
  //           track.album.images[0]
  //         );
  //         return {
  //           album: track.album.name,
  //           artist: track.artists[0].name,
  //           title: track.name,
  //           uri: track.uri,
  //           albumUrl: smallAlbumImg.url,
  //         };
  //       })
  //     );
  //   });
  //   return () => (cancel = true);
  // }, [search, accessToken]);

  const showRecent = () => {
    if (!accessToken) return;
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

    // axios("https://api.spotify.com/v1/me/top/artists", {
    //   method: "GET",
    //   headers: { Authorization: "Bearer" + accessToken },
    // })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <Container>
      <h1>Testing</h1>
      <button onClick={() => showRecent()}>Click Me</button>
    </Container>
  );
}
