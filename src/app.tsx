import React, { useEffect } from "react";

import { MapView } from "./map-view";
import { getPoiLists } from "@actions/PoiListsActions";
import { getPoiListsSetting } from "@actions/PoiListsSettingActions";
import { useDispatch } from "react-redux";
import PoiListsDrawer from "@components/PoiListsDrawer";
import { MapProvider } from "@utils/MapContext";

import "./app.less";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch Poi lists setting and Poi lists
    dispatch(getPoiListsSetting());
    dispatch(getPoiLists());
  }, []);

  return (
    <>
      <MapProvider>
        <MapView />
        <PoiListsDrawer />
      </MapProvider>
    </>
  );
}

export { App };
