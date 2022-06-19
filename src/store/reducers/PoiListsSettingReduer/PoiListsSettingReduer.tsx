import * as ActionType from "@actionTypes/PoiListsSettingTypes";
import { saveState } from "@utils/localStorage";
import { POI_LISTS_SETTING, LOCALSTORAGE } from "@utils/constants";

const initialState: ActionType.PoiListsSetting = POI_LISTS_SETTING;

export default function poiListsSettingReducer(
  state = initialState,
  action
): ActionType.PoiListsSetting {
  switch (action.type) {
    case ActionType.SET_POI_LISTS_SETTING: {
      return { ...state, ...action.payload };
    }
    case ActionType.ADD_POI_LIST_TO_SETTING: {
      const { payload } = action;
      const newState = {
        ...state,
        ...payload,
      };
      // Temporary solution to save data to localstorage
      saveState(LOCALSTORAGE.POI_LIST_CONFIG, newState);
      return newState;
    }
    case ActionType.REMOVE_POI_LIST_FROM_SETTING: {
      const newState = { ...state };
      delete newState[action.name];
      // Temporary solution to save data to localstorage
      saveState(LOCALSTORAGE.POI_LIST_CONFIG, newState);
      return newState;
    }
    default:
      return state;
  }
}
