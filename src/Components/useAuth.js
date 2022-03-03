import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [useLocal, setUseLocal] = useState();

  // runs on login click, gets access token
  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      setAccessToken(localStorage.getItem("accessToken"));
      window.history.pushState({}, null, "/Dashboard");
      console.log("in local");
      return;
    }
    if (code === null) {
      console.log("no code");
      return;
    }
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("expiresIn", res.data.expiresIn);
        localStorage.setItem("currentTime", Math.floor(Date.now() / 1000));
        window.history.pushState({}, null, "/Dashboard");
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  // runs when refresh token is about to expire, resets auth token
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          console.log("Refresh");
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("currentTime", Math.floor(Date.now() / 1000));
          window.history.pushState({}, null, "/Dashboard");
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);
  return accessToken;
}
