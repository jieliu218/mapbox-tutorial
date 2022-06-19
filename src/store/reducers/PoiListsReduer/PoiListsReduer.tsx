import * as ActionType from "@actionTypes/PoiListsTypes";
import { saveState } from "@utils/localStorage";
import { POI_LISTS_SETTING, LOCALSTORAGE } from "@utils/constants";

const initialState: ActionType.PosLists = {};

Object.keys(POI_LISTS_SETTING).forEach((name: string) => {
  return (initialState[name] = []);
});

export default function poiListsReducer(
  state = initialState,
  action
): ActionType.PosLists {
  switch (action.type) {
    case ActionType.SET_POI_LISTS: {
      return { ...state, ...action.payload };
    }
    case ActionType.ADD_POI_TO_LISTS: {
      const { listName, payload } = action;
      const newState = {
        ...state,
        [listName]: [...state[listName], payload],
      };
      // Temporary solution to save data to localstorage
      saveState(LOCALSTORAGE.POI_LISTS, newState);
      return newState;
    }
    case ActionType.REMOVE_POI_FROM_LISTS: {
      const { listName, id } = action;
      const newState = {
        ...state,
        [listName]: [...state[listName]].filter((poi) => id !== poi.id),
      };
      // Temporary solution to save data to localstorage
      saveState(LOCALSTORAGE.POI_LISTS, newState);
      return newState;
    }
    default:
      return state;
  }
}
