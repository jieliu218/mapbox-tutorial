// User action types
export const GET_POI_LISTS: string = "GET_POI_LISTS";
export const POST_POI_TO_LISTS: string = "POST_POI_TO_LISTS";
export const DELETE_POI_FROM_LISTS: string = "DELETE_POI_FROM_LISTS";

// Internal action types
export const SET_POI_LISTS: string = "SET_POI_LISTS";
export const ADD_POI_TO_LISTS: string = "ADD_POI_TO_LISTS";
export const REMOVE_POI_FROM_LISTS: string = "REMOVE_POI_FROM_LISTS";

export interface PoiInfo {
  id: number | string;
  name: string;
  type: string;
  coordinates: number[];
  zoom: number;
}

export type PosLists = { [key: string]: PoiInfo[] };

export interface GetPoiLists {
  type: typeof GET_POI_LISTS;
}

export interface PostPoiToLists {
  type: typeof POST_POI_TO_LISTS;
  listName: string;
  payload: PoiInfo;
}

export interface DeletePoiFromLists {
  type: typeof DELETE_POI_FROM_LISTS;
  listName: string;
  id: number | string;
}

export type PoiListsUserActionType =
  | GetPoiLists
  | PostPoiToLists
  | DeletePoiFromLists;

export interface SetPoiLists {
  type: typeof SET_POI_LISTS;
  payload: PosLists;
}

export interface AddPoiToLists {
  type: typeof ADD_POI_TO_LISTS;
  listName: string;
  payload: PoiInfo;
}

export interface RemovePoiFromLists {
  type: typeof REMOVE_POI_FROM_LISTS;
  listName: string;
  id: number | string;
}

export type PoiListsInternalActionType =
  | SetPoiLists
  | AddPoiToLists
  | RemovePoiFromLists;
