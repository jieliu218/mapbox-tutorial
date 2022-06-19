import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MapView } from "./map-view";
import mapboxgl from "mapbox-gl";
import style from "./data/style.json";
import { MapProvider } from "@utils/MapContext";
// import mapboxgl, { Style, MapboxGeoJSONFeature } from "mapbox-gl";

describe("MapView", () => {
  it("renders", () => {
    const mockMapOn = jest.fn();
    jest
      .spyOn(mapboxgl, "Map")
      // @ts-ignore
      .mockImplementation(() => {
        return {
          on: mockMapOn,
        };
      });
    render(
      <MapProvider>
        <MapView />
      </MapProvider>
    );
    expect(mapboxgl.Map).toBeCalledWith({
      style,
      container: expect.any(HTMLElement),
    });
    expect(mockMapOn).toBeCalledTimes(3);
  });
});
