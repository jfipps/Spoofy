import React, { useState, useEffect, useContext } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./Components/useAuth";

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const spotifyWebApi = new SpotifyWebApi({
    clientId: "fd1fb953c28a42ab9fbe07099618dc50",
  });

  const [showSidebar, setShowSidebar] = useState(false);
  const [apiCode, setAPICode] = useState("");

  const printCode = (code) => {
    console.log("Code " + code);
  };

  return (
    <SpoofyContext.Provider
      value={{ showSidebar, setShowSidebar, apiCode, setAPICode, printCode }}
    >
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
