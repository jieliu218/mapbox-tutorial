import React, { useRef, useEffect, Suspense, useState } from "react";
import mapboxgl, { Style, MapboxGeoJSONFeature, Popup } from "mapbox-gl";
import style from "./data/style.json";
import { MAPBOX_LABEL } from "@utils/constants";
import { Spin } from "antd";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { useMap } from "@utils/MapContext";

// style
import "mapbox-gl/dist/mapbox-gl.css";

const PoiInfoCard = React.lazy(() => import("@components/PoiInfoCard"));

// If there are issues, replace with your token
const ACCESS_TOKEN =
  "pk.eyJ1IjoibWFwYm94LW1hcC1kZXNpZ24iLCJhIjoiY2syeHpiaHlrMDJvODNidDR5azU5NWcwdiJ9.x0uSqSWGXdoFKuHZC5Eo_Q";

function MapView() {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useMap();
  const [popup, setPopup] = useState<Popup>();

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: style as Style, // Note: style is not matching Mapbox Style type
    });
    setMap(map);
    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!map) return;
    map.on("click", MAPBOX_LABEL.poi, function (e) {
      const features: MapboxGeoJSONFeature[] = map.queryRenderedFeatures(
        e.point
      );
      if (!features.length || features[0].geometry.type !== "Point") {
        return;
      }
      const coordinates = features[0].geometry.coordinates.slice() as [
        number,
        number
      ];
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      // Source: Mapbox popup example
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const placeholder = document.createElement("div");
      ReactDOM.render(
        <Provider store={store}>
          <Suspense fallback={<Spin />}>
            <PoiInfoCard feature={features[0]} />
          </Suspense>
        </Provider>,
        placeholder
      );
      const popup = new mapboxgl.Popup({ maxWidth: "none" })
        .setLngLat(coordinates)
        .setDOMContent(placeholder)
        .addTo(map);

      setPopup(popup);
    });
    // When the mouse is moving over the Poi layer, change the cursor to a pointer.
    map.on("mouseenter", MAPBOX_LABEL.poi, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // When it leaves, change it back to a grab cursor.
    map.on("mouseleave", MAPBOX_LABEL.poi, () => {
      map.getCanvas().style.cursor = "";
    });

    // Clean up on unmount
    return () => {
      map.off();
      popup.remove();
    };
  }, [map]);

  return <div className="map-container" ref={mapContainerRef} />;
}

export { MapView };
