import React, { createContext, useContext, useState } from "react";

// create context object
const MapContext = createContext([]);

export function MapProvider(props) {
  const [map, setMap] = useState();
  return <MapContext.Provider value={[map, setMap]} {...props} />;
}

export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined)
    throw Error("You forgot to wrap your app with <MapProvider />");
  return context;
}
