import {
  GET_POI_LISTS,
  SET_POI_LISTS,
  ADD_POI_TO_LISTS,
  REMOVE_POI_FROM_LISTS,
  PoiListsUserActionType,
  PoiListsInternalActionType,
  PosLists,
  AddPoiToLists,
  RemovePoiFromLists,
  PostPoiToLists,
  DeletePoiFromLists,
  POST_POI_TO_LISTS,
  DELETE_POI_FROM_LISTS,
} from "@actionTypes/PoiListsTypes";

// User actions

export function getPoiLists(): PoiListsUserActionType {
  return {
    type: GET_POI_LISTS,
  };
}

export function postPoiToLists({
  payload,
  listName,
}: Omit<PostPoiToLists, "type">): PoiListsUserActionType {
  return {
    type: POST_POI_TO_LISTS,
    listName,
    payload,
  };
}

export function deletePoiFromLists({
  id,
  listName,
}: Omit<DeletePoiFromLists, "type">): PoiListsUserActionType {
  return {
    type: DELETE_POI_FROM_LISTS,
    listName,
    id,
  };
}

// Internal reducer actions

export function setPoiLists(payload: PosLists): PoiListsInternalActionType {
  return {
    type: SET_POI_LISTS,
    payload,
  };
}

export function addPoiToLists({
  payload,
  listName,
}: Omit<AddPoiToLists, "type">): PoiListsInternalActionType {
  return {
    type: ADD_POI_TO_LISTS,
    listName,
    payload,
  };
}

export function removePoiFromLists({
  id,
  listName,
}: Omit<RemovePoiFromLists, "type">): PoiListsInternalActionType {
  return {
    type: REMOVE_POI_FROM_LISTS,
    listName,
    id,
  };
}
