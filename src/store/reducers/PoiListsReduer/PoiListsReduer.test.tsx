import * as Actions from "@actions/PoiListsActions";
import * as ActionTypes from "@actionTypes/PoiListsTypes";
import reducer from "./PoiListsReduer";
import { FAVORIATES } from "@utils/constants";
import { mockPoiInfo, mockPoiInfo_1 } from "@utils/dummyData";

describe("PoiListsReduer", () => {
  it("inits poiLists state", () => {
    const mockInitialState: ActionTypes.PosLists = {
      favoriates: [],
    };
    const mockPoiLists: ActionTypes.PosLists = {
      favoriates: [mockPoiInfo],
    };
    const nextState: ActionTypes.PosLists = reducer(
      mockInitialState,
      Actions.setPoiLists(mockPoiLists)
    );

    expect(nextState).toEqual({
      favoriates: [mockPoiInfo],
    });
  });

  it("adds a new poi to poiLists state", () => {
    const mockInitialState: ActionTypes.PosLists = {
      favoriates: [mockPoiInfo],
    };

    const nextState: ActionTypes.PosLists = reducer(
      mockInitialState,
      Actions.addPoiToLists({
        listName: FAVORIATES,
        payload: mockPoiInfo_1,
      })
    );

    expect(nextState).toEqual({
      favoriates: [mockPoiInfo, mockPoiInfo_1],
    });
  });

  it("removes a poi from poiLists state", () => {
    const mockInitialState: ActionTypes.PosLists = {
      favoriates: [mockPoiInfo, mockPoiInfo_1],
    };

    const nextState: ActionTypes.PosLists = reducer(
      mockInitialState,
      Actions.removePoiFromLists({
        listName: FAVORIATES,
        id: 5587319342,
      })
    );

    expect(nextState).toEqual({
      favoriates: [mockPoiInfo],
    });
  });
});
