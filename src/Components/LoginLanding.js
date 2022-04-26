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
import {
  FaHome,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaHeadphonesAlt,
} from "react-icons/fa";

//Try changing the redirect URI
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=fd1fb953c28a42ab9fbe07099618dc50&response_type=code&redirect_uri=http://localhost:3000/Dashboard&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20streaming%20user-read-playback-position";

export default function LoginLanding() {
  return (
    <>
      <div className="Header">
        <header>
          <Container>
            <a id="spoofy-link" className="SpoofyLink" href="/">
              <h1>
                <FaHeadphonesAlt size={40} className="HeadphonesIcon" />
                Spoofy
              </h1>
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
    </>
  );
}
