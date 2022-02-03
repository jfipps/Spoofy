import React from "react";
import "../CSS/Login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

export default function LoginHeader() {
  return (
    <header>
      <Container>
        <a id="spoofy-link" className="SpoofyLink" href="/">
          <h1>Spoofy</h1>
        </a>
      </Container>
    </header>
  );
}
