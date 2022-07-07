import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Login.css";
import { FaHome, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function LoginFooter() {
  return (
    <section id="About" className="LoginFooter">
      <Container>
        <div className="FooterRow">
          <div className="FooterItem">
            <div className="FooterLinks">
              <ul id="footer-list" className="FooterList">
                <li className="ListHeader">Other Projects</li>
                <li>
                  <a id="footer-link" href="http://nhldatabase.jaredfipps.com/">
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
                Spoofy utilizes the Spotify API to give users streamlined access
                to their recent listening trends. Also uses a React-based
                front-end along with Bootstrap for styling.
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
    </section>
  );
}
