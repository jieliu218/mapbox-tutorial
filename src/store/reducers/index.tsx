import { combineReducers } from "redux";
import poiLists from "./PoiListsReduer";
import poiListsSetting from "./PoiListsSettingReduer";

export const initialState: any = {};

export const rootReducer: any = combineReducers({
  poiLists,
  poiListsSetting,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
