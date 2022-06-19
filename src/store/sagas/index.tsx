import { all } from "redux-saga/effects";

import poiListsSaga from "./PoiListsSaga";
import PoiListsSettingSaga from "./PoiListsSettingSaga";

export default function* rootSaga() {
  yield all([...poiListsSaga, ...PoiListsSettingSaga]);
}
