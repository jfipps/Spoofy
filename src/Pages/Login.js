import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import "../CSS/Login.css";
import LoginLanding from "../Components/LoginLanding";
import LoginInfo from "../Components/LoginInfo";
import LoginFooter from "../Components/LoginFooter";

export default function login() {
  return (
    <>
      <LoginLanding></LoginLanding>
      <LoginInfo></LoginInfo>
      <LoginFooter></LoginFooter>
    </>
  );
}
