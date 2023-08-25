import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import { useSearchParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/Artist.css";
import Sidebar from "../Components/Sidebar";
import PlayerFooter from "../Components/PlayerFooter";
import ArtistHeader from "../Components/ArtistHeader";
import ArtistAlbums from "../Components/ArtistAlbums";
import ArtistTopTracksTable from "../Components/ArtistTopTracksTable";

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
    setTrackURI,
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

  const showToast = (trackName) => {
    toast('"' + trackName + '"' + " added to queue");
  };

  return (
    <>
      <section className="ArtistPage">
        <Sidebar></Sidebar>
        <section className="ArtistBody">
          {loading ? (
            <div className="Loader">
<<<<<<< HEAD
              <Circles type="Circles" color="#00BFFF" height={80} width={80} />
=======
              <Circles type="Circles" color="#ddd9d9" height={80} width={80} />
>>>>>>> 905d206 (Final Commit)
            </div>
          ) : (
            <div>
              <ArtistHeader></ArtistHeader>
              <div className="Content">
                <ArtistTopTracksTable toast={showToast}></ArtistTopTracksTable>
                <ArtistAlbums
                  albumTracks={albumTracks}
                  toast={showToast}
                ></ArtistAlbums>
              </div>
              <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <PlayerFooter></PlayerFooter>
            </div>
          )}
        </section>
      </section>
    </>
  );
}
