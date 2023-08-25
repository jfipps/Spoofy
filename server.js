require("dotenv").config();

// Imports
const path = require("path");
const express = require("express");
const spotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client/build")));

app.post("/refresh", (req, res) => {
  console.log("Refresh");
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      // Save the access token so that it's used in future calls
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expiresIn,
      });
      spotifyApi.setAccessToken(data.body["access_token"]);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  console.log(req);
  const code = req.body.code;
  console.log(process.env.REDIRECT_URI);
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log("Failure " + err);
      res.sendStatus(400);
    });
});

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "client/build") });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  console.log("prod");
  const index = path.join(__dirname, "build", "index.html");
  console.log(index);
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: path.join(__dirname, "client/build") });
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
