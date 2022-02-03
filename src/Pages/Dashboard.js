import React from "react";
import useAuth from "../Components/useAuth";
import { useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../Components/TrackSearchResult";
import Player from "../Components/Player";

const spotifyWebApi = new SpotifyWebApi({
  clientId: "fd1fb953c28a42ab9fbe07099618dc50",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    spotifyWebApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;

    spotifyWebApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallAlbumImg = track.album.images.reduce(
            (smallest, current) => {
              if (current.height < smallest.height) {
                return current;
              }
              return smallest;
            },
            track.album.images[0]
          );
          return {
            album: track.album.name,
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallAlbumImg.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

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
  };

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></Form.Control>
      <button className="btn btn-success btn-lg" onClick={() => showRecent()}>
        Show Recent
      </button>
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          );
        })}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} />
      </div>
    </Container>
  );
}
