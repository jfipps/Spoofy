import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { useSearchParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import "../CSS/Artist.css";
import Sidebar from "../Components/Sidebar";
import Player from "../Components/Player";
import ArtistHeader from "../Components/ArtistHeader";
import ArtistAlbums from "../Components/ArtistAlbums";
import ArtistTopTracks from "../Components/ArtistTopTracks";

export default function ArtistPage() {
  const {
    access,
    setAccess,
    artist,
    setArtistID,
    artistAlbums,
    loading,
    setLoading,
    getAlbumTracks,
    artistTopTracks,
  } = useContext(SpoofyContext);

  const [albumTracks, setAlbumTracks] = useState([]);

  setArtistID(new URLSearchParams(window.location.search).get("id"));

  useEffect(() => {
    if (artistAlbums.length > 0) {
      artistAlbums.forEach((album, index) =>
        setAlbumTracks((albumTracks) => [
          ...albumTracks,
          getAlbumTracks(album.id),
        ])
      );
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    clearTimeout();
  }, [artistAlbums]);

  return (
    <>
      <section className="ArtistPage">
        <Sidebar></Sidebar>
        <section className="ArtistBody">
          {loading ? (
            <div className="Loader">
              <Circles type="Circles" color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            <div>
              <ArtistHeader></ArtistHeader>
              <div className="Content">
                <ArtistAlbums albumTracks={albumTracks}></ArtistAlbums>
                <ArtistTopTracks></ArtistTopTracks>
              </div>
            </div>
          )}
          <div className="Player">
            <Player accessToken={access}></Player>
          </div>
        </section>
      </section>
    </>
  );
}
