import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";

export default function LoginInfo() {
  return (
    <section id="Info" className="InfoSection">
      <Container>
        <div className="InfoHeader">
          <h1>Year round stats</h1>
        </div>
        <div className="Info">
          <div className="InfoRow">
            <div className="InfoCol col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <h3>Take a glance at your faves</h3>
              <p className="InfoParagraph">
                See what your favorite artists and songs are based on recent
                plays.
              </p>
              <a id="get-started-link" href="#Login">
                FAVORITE TRACKS AND ARTISTS
              </a>
            </div>
            <div className="InfoCol col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <h3>Track your listening habits</h3>
              <p className="InfoParagraph">
                See which songs you've had stuck on repeat.
              </p>
              <a id="get-started-link" href="#Login">
                EXPLORE YOUR SONGS
              </a>
            </div>
            <div className="InfoCol col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4">
              <h3>Play your music</h3>
              <p className="InfoParagraph">
                Use the built-in web player to keep your favorites going while
                you go through your recents.
              </p>
              <a id="get-started-link" href="#Login">
                LISTEN IN
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
