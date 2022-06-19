import { put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/core";
import * as Actions from "@actions/PoiListsSettingActions";
import * as ActionTypes from "@actionTypes/PoiListsSettingTypes";
import { loadState } from "@utils/localStorage";
import { LOCALSTORAGE } from "@utils/constants";

export function* getPoiListsSettingSaga(): SagaIterator {
  try {
    // Todo: connect with backend api
    const state = yield loadState(LOCALSTORAGE.POI_LIST_CONFIG);
    yield put(Actions.setPoiListsSetting(state));
  } catch (error) {
    // TODO: handle error
  }
}

export function* postPoiListsToSettingSaga({
  payload,
}: ActionTypes.PostPoiListToSetting): SagaIterator {
  try {
    // Todo: connect with backend api
    yield put(Actions.addPoiListToSetting({ payload }));
  } catch (error) {
    // TODO: handle error
  }
}

export function* deletePoiListFromSettingSaga({
  name,
}: ActionTypes.DeletePoiListFromSetting): SagaIterator {
  try {
    // Todo: connect with backend api
    yield put(Actions.removePoiListsFromSetting({ name }));
  } catch (error) {
    // TODO: handle error
  }
}

const poiListsSagas = [
  takeLatest(ActionTypes.GET_POI_LISTS_SETTING, getPoiListsSettingSaga),
  takeLatest(ActionTypes.POST_POI_LIST_TO_SETTING, postPoiListsToSettingSaga),
  takeLatest(
    ActionTypes.DELETE_POI_LIST_FROM_SETTING,
    deletePoiListFromSettingSaga
  ),
];

export default poiListsSagas;
