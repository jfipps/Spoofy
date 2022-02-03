const express = require("express");
const spotifyWebApi = require("spotify-web-api-node");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log("Refresh Token " + refreshToken);
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
    clientSecret: "097159cefb464362b205a46fc4a01f58",
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
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: "http://localhost:3000",
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
    clientSecret: "097159cefb464362b205a46fc4a01f58",
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
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3001);
