import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import "../CSS/Artist.css";

export default function ArtistAlbums() {
  const { artistAlbums, getAlbumTracks } = useContext(SpoofyContext);

  const [loading, setLoading] = useState(true);
  const [albumTracks, setAlbumTracks] = useState([]);

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
  }, [artistAlbums]);

  return (
    <section className="ArtistAlbums">
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="Albums">
          {artistAlbums && (
            <div className="Albums">
              {artistAlbums.map((album, index) => {
                return (
                  <article key={index}>
                    <img
                      className="AlbumImage"
                      src={album.images[0].url}
                      alt={album.name}
                    />
                    {albumTracks[index].map((currAlbum) => {
                      return (
                        <h2 onClick={() => console.log(currAlbum.uri)}>
                          {currAlbum.name}
                        </h2>
                      );
                    })}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
