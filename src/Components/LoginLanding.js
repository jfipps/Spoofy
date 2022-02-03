import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";
import Dookie from "../Resources/Dookie.jpg";
import Humbug from "../Resources/Humbug.jpg";
import Graduation from "../Resources/Graduation.jpg";
import Innerspeaker from "../Resources/Innerspeaker.jpg";
import IsThisIt from "../Resources/IsThisIt.jpg";
import Zeppelin2 from "../Resources/Zeppelin2.jpg";
import { FaHome, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fd1fb953c28a42ab9fbe07099618dc50&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played";

export default function LoginLanding() {
  return (
    <>
      <div className="Header">
        <header>
          <Container>
            <a id="spoofy-link" className="SpoofyLink" href="/">
              <h1>Spoofy</h1>
            </a>
          </Container>
        </header>
        <Container>
          <section id="Login" className="LoginSection">
            <div className="LandingRow">
              <div className="LoginTextCol">
                <h1>
                  <strong>Welcome to Spoofy!</strong>
                </h1>
                <h3>See what music trends you've been following year round.</h3>
                <button id="button-green" className="btn btn-primary btn-lg">
                  <a id="button-link" href={AUTH_URL}>
                    LOGIN WITH SPOTIFY
                  </a>
                </button>
              </div>
              <div className="AlbumCol col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
                <div className="Row">
                  <div className="col-6 col-sm-4 albumGrid">
                    <img src={Dookie} alt="Dookie" className="img-fluid" />
                  </div>
                  <div className="col-6 col-sm-4 albumGrid">
                    <img
                      src={Innerspeaker}
                      alt="Innerspeaker"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-6 col-sm-4 albumGrid">
                    <img src={IsThisIt} alt="IsThisIt" className="img-fluid" />
                  </div>
                  <div className="col-6 col-sm-4 albumGrid">
                    <img
                      src={Graduation}
                      alt="Graduation"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-6 col-sm-4 albumGrid">
                    <img src={Zeppelin2} alt="Zep2" className="img-fluid" />
                  </div>
                  <div className="col-6 col-sm-4 albumGrid">
                    <img src={Humbug} alt="Humbug" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="Example" className="ExampleSection">
            <div className="Example">
              <h1>Track your personal favorite songs and artists</h1>
            </div>
          </section>
        </Container>
      </div>
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
      <footer id="About" className="Footer">
        <Container>
          <div className="FooterRow">
            <div className="FooterItem">
              <div className="FooterLinks">
                <ul id="footer-list" className="FooterList">
                  <li className="ListHeader">Other Projects</li>
                  <li>
                    <a
                      id="footer-link"
                      href="http://nhldatabase.jaredfipps.com/"
                    >
                      NHL Database
                    </a>
                  </li>
                </ul>
                <ul className="FooterList">
                  <li className="ListHeader">Links</li>
                  <li>
                    <a id="footer-link" href="#Login">
                      Login
                    </a>
                  </li>
                  <li>
                    <a id="footer-link" href="#Example">
                      Examples
                    </a>
                  </li>
                  <li>
                    <a id="footer-link" href="#Info">
                      Information
                    </a>
                  </li>
                  <li>
                    <a id="footer-link" href="#About">
                      About
                    </a>
                  </li>
                </ul>
              </div>
              <div className="AboutItem">
                <h5 className="AboutTitle">About Spoofy</h5>
                <p className="AboutParagraph">
                  Spoofy utilizes the Spotify API to give users streamlined
                  access to their recent listening trends. Also uses a
                  React-based front-end along with Bootstrap for styling.
                </p>
              </div>
            </div>
          </div>
          <div className="SocialRow">
            <div className="SocialIcons">
              <a href="http://www.jaredfipps.com">
                <FaHome size={28}></FaHome>
              </a>
              <a
                href="http://www.linkedin.com/in/jared-fipps
"
              >
                <FaLinkedinIn size={28}></FaLinkedinIn>
              </a>
              <a href="https://github.com/jfipps">
                <FaGithub size={28}></FaGithub>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
}
