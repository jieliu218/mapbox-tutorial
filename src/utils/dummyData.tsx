import * as ActionTypes from "@actionTypes/PoiListsTypes";
import { MapboxGeoJSONFeature } from "mapbox-gl";
import { FAVORIATES, WANT_TO_GO, POI_LISTS_SETTING } from "@utils/constants";

export const mockPoiInfo: ActionTypes.PoiInfo = {
  id: 5587319341,
  name: "mockName",
  type: "mockType",
  coordinates: [1, 2],
  zoom: 3,
};

export const mockPoiInfo_1: ActionTypes.PoiInfo = {
  id: 5587319342,
  name: "mockName_1",
  type: "mockType",
  coordinates: [3, 4],
  zoom: 3,
};

export const mockFeature = {
  id: 5587319341,
  properties: {
    name: "mockName",
    type: "mockType",
  },
  geometry: {
    type: "Point",
    coordinates: [1, 2],
  },
  _z: 3,
} as unknown as MapboxGeoJSONFeature;

export const mockPoiLists = {
  [FAVORIATES]: [mockPoiInfo, mockPoiInfo_1],
  [WANT_TO_GO]: [mockPoiInfo],
};

export const mockPoiListsSetting = POI_LISTS_SETTING;
