import {
  GET_POI_LISTS_SETTING,
  SET_POI_LISTS_SETTING,
  ADD_POI_LIST_TO_SETTING,
  REMOVE_POI_LIST_FROM_SETTING,
  PoiListSettingUserActionType,
  PoiListsSettingInternalActionType,
  PoiListsSetting,
  AddPoiListToSetting,
  RemovePoiListFromSetting,
  PostPoiListToSetting,
  DeletePoiListFromSetting,
  POST_POI_LIST_TO_SETTING,
  DELETE_POI_LIST_FROM_SETTING,
} from "@actionTypes/PoiListsSettingTypes";

// User actions

export function getPoiListsSetting(): PoiListSettingUserActionType {
  return {
    type: GET_POI_LISTS_SETTING,
  };
}

export function postPoiListToSetting({
  payload,
}: Omit<PostPoiListToSetting, "type">): PoiListSettingUserActionType {
  return {
    type: POST_POI_LIST_TO_SETTING,
    payload,
  };
}

export function deletePoiListFromSetting({
  name,
}: Omit<DeletePoiListFromSetting, "type">): PoiListSettingUserActionType {
  return {
    type: DELETE_POI_LIST_FROM_SETTING,
    name,
  };
}

// Internal reducer actions

export function setPoiListsSetting(
  payload: PoiListsSetting
): PoiListsSettingInternalActionType {
  return {
    type: SET_POI_LISTS_SETTING,
    payload,
  };
}

export function addPoiListToSetting({
  payload,
}: Omit<AddPoiListToSetting, "type">): PoiListsSettingInternalActionType {
  return {
    type: ADD_POI_LIST_TO_SETTING,
    payload,
  };
}

export function removePoiListsFromSetting({
  name,
}: Omit<RemovePoiListFromSetting, "type">): PoiListsSettingInternalActionType {
  return {
    type: REMOVE_POI_LIST_FROM_SETTING,
    name,
  };
}
