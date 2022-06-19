import * as Sagas from "./PoiListsSaga";
import * as Actions from "@actions/PoiListsActions";
import { expectSaga } from "redux-saga-test-plan";
import { mockPoiInfo, mockPoiLists } from "@utils/dummyData";
import { loadState } from "@utils/localStorage";
import { FAVORIATES } from "@utils/constants";

jest.mock("@utils/localStorage");

describe("PoiListsSaga", () => {
  it("gets Poi lists", () => {
    (loadState as jest.Mock).mockReturnValue({
      ...mockPoiLists,
    });
    return (
      expectSaga(Sagas.getPoiListsSaga)
        // Assert that the `put` will eventually happen.
        .put(Actions.setPoiLists(mockPoiLists))
        .run()
    );
  });

  it("posts a new Poi to the selected list", () => {
    const action = Actions.postPoiToLists({
      payload: mockPoiInfo,
      listName: FAVORIATES,
    });
    return expectSaga(Sagas.postPoiToListsSaga, action)
      .put(
        Actions.addPoiToLists({ payload: mockPoiInfo, listName: FAVORIATES })
      )
      .run();
  });

  it("deletes the selected Poi from the selected list", () => {
    const action = Actions.deletePoiFromLists({
      id: mockPoiInfo.id,
      listName: FAVORIATES,
    });
    return expectSaga(Sagas.deletePoiFromListsSaga, action)
      .put(
        Actions.removePoiFromLists({ id: mockPoiInfo.id, listName: FAVORIATES })
      )
      .run();
  });
});
