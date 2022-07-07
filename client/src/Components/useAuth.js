import React from "react";
import { useState, useEffect, useContext } from "react";
import { SpoofyContext } from "../context";
import axios from "axios";

// map for localStorage keys
const LOCALSTORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  expireTime: "expiresIn",
  timestamp: "currentTime",
};

// map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

export default function useAuth(code) {
  const { loggingOut, setLoggingOut } = useContext(SpoofyContext);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [useLocal, setUseLocal] = useState();

  // runs on login click, gets access token
  useEffect(() => {
    let loggedIn = false;
    if (
      Math.floor(Date.now() / 1000) - LOCALSTORAGE_VALUES.timestamp <
      LOCALSTORAGE_VALUES.expireTime
    ) {
      loggedIn = true;
    }
    // checks if access token already exists and time limit has not been reached
    if (localStorage.getItem("accessToken") !== null && loggedIn) {
      setAccessToken(localStorage.getItem("accessToken"));
      window.history.pushState({}, null, "/Dashboard");
      return;
    }
    // skips initial code pull if already logged in as login button is not clicked
    if (code === null) {
      console.log("no code");
      setLoggingOut(true);
      return;
    }
    // server.js call with code to get AccessToken, RefreshToken, and ExpiresIn time
    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(70);
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
    // sets up interval to trigger for refresh when time is up
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