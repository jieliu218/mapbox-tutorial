import * as Actions from "@actions/PoiListsSettingActions";
import * as ActionTypes from "@actionTypes/PoiListsSettingTypes";
import reducer from "./PoiListsSettingReduer";
import { FAVORIATES, WANT_TO_GO } from "@utils/constants";

describe("PoiListsSettingReduer", () => {
  it("inits poiLists setting state", () => {
    const mockInitialState: ActionTypes.PoiListsSetting = {
      [FAVORIATES]: "mock",
    };
    const mockPoiListsSetting: ActionTypes.PoiListsSetting = {
      [FAVORIATES]: "mock",
      [WANT_TO_GO]: "mock",
    };
    const nextState: ActionTypes.PoiListsSetting = reducer(
      mockInitialState,
      Actions.setPoiListsSetting(mockPoiListsSetting)
    );

    expect(nextState).toEqual({
      [FAVORIATES]: "mock",
      [WANT_TO_GO]: "mock",
    });
  });

  it("adds a new poi list to setting state", () => {
    const mockInitialState: ActionTypes.PoiListsSetting = {
      [FAVORIATES]: "mock",
    };

    const nextState: ActionTypes.PoiListsSetting = reducer(
      mockInitialState,
      Actions.addPoiListToSetting({
        payload: { [WANT_TO_GO]: "mock" },
      })
    );

    expect(nextState).toEqual({
      [FAVORIATES]: "mock",
      [WANT_TO_GO]: "mock",
    });
  });

  it("removes a poi list from setting state", () => {
    const mockInitialState: ActionTypes.PoiListsSetting = {
      [FAVORIATES]: "mock",
      [WANT_TO_GO]: "mock",
    };

    const nextState: ActionTypes.PoiListsSetting = reducer(
      mockInitialState,
      Actions.removePoiListsFromSetting({
        name: FAVORIATES,
      })
    );

    expect(nextState).toEqual({
      [WANT_TO_GO]: "mock",
    });
  });
});
