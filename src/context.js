import React, { useState, useContext } from "react";

const SpoofyContext = React.createContext();

const SpoofyProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <SpoofyContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SpoofyContext.Provider>
  );
};

// custom hook

export { SpoofyContext, SpoofyProvider };
