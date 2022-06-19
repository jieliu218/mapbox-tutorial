import { put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import * as Actions from "@actions/PoiListsActions";
import * as ActionTypes from "@actionTypes/PoiListsTypes";
import { loadState } from "@utils/localStorage";
import { LOCALSTORAGE } from "@utils/constants";

export function* getPoiListsSaga(): SagaIterator {
  try {
    // Todo: connect with backend api
    const state = yield loadState(LOCALSTORAGE.POI_LISTS);
    yield put(Actions.setPoiLists(state));
  } catch (error) {
    // TODO: handle error
  }
}

export function* postPoiToListsSaga({
  payload,
  listName,
}: ActionTypes.PostPoiToLists): SagaIterator {
  try {
    // Todo: connect with backend api
    yield put(Actions.addPoiToLists({ payload, listName }));
  } catch (error) {
    // TODO: handle error
  }
}

export function* deletePoiFromListsSaga({
  id,
  listName,
}: ActionTypes.DeletePoiFromLists): SagaIterator {
  try {
    // Todo: connect with backend api
    yield put(Actions.removePoiFromLists({ id, listName }));
  } catch (error) {
    // TODO: handle error
  }
}

const poiListsSagas = [
  takeLatest(ActionTypes.GET_POI_LISTS, getPoiListsSaga),
  takeLatest(ActionTypes.POST_POI_TO_LISTS, postPoiToListsSaga),
  takeLatest(ActionTypes.DELETE_POI_FROM_LISTS, deletePoiFromListsSaga),
];

export default poiListsSagas;
