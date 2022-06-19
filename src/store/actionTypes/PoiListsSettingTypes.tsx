// User action types
export const GET_POI_LISTS_SETTING: string = "GET_POI_LISTS_SETTING";
export const POST_POI_LIST_TO_SETTING: string = "POST_POI_LIST_TO_SETTING";
export const DELETE_POI_LIST_FROM_SETTING: string =
  "DELETE_POI_LIST_FROM_SETTING";

// Internal action types
export const SET_POI_LISTS_SETTING: string = "SET_POI_LISTS_SETTING";
export const ADD_POI_LIST_TO_SETTING: string = "ADD_POI_LIST_TO_SETTING";
export const REMOVE_POI_LIST_FROM_SETTING: string =
  "REMOVE_POI_LIST_FROM_SETTING";

export interface PoiListsSetting {
  [key: string]: string;
}

export interface GetPoiListsSetting {
  type: typeof GET_POI_LISTS_SETTING;
}

export interface PostPoiListToSetting {
  type: typeof POST_POI_LIST_TO_SETTING;
  payload: PoiListsSetting;
}

export interface DeletePoiListFromSetting {
  type: typeof DELETE_POI_LIST_FROM_SETTING;
  name: string;
}

export type PoiListSettingUserActionType =
  | GetPoiListsSetting
  | PostPoiListToSetting
  | DeletePoiListFromSetting;

export interface SetPoiListSetting {
  type: typeof SET_POI_LISTS_SETTING;
  payload: PoiListsSetting;
}

export interface AddPoiListToSetting {
  type: typeof ADD_POI_LIST_TO_SETTING;
  payload: PoiListsSetting;
}

export interface RemovePoiListFromSetting {
  type: typeof REMOVE_POI_LIST_FROM_SETTING;
  name: string;
}

export type PoiListsSettingInternalActionType =
  | SetPoiListSetting
  | AddPoiListToSetting
  | RemovePoiListFromSetting;
