import * as Sagas from "./PoiListsSettingSaga";
import * as Actions from "@actions/PoiListsSettingActions";
import { expectSaga } from "redux-saga-test-plan";
import { loadState } from "@utils/localStorage";
import { FAVORIATES, POI_LISTS_SETTING } from "@utils/constants";

import { mockPoiInfo, mockPoiListsSetting } from "@utils/dummyData";

jest.mock("@utils/localStorage");

const mockPoiListName = { mock: "mockName" };

describe("PoiListsSettingSaga", () => {
  it("gets Poi lists setting", () => {
    (loadState as jest.Mock).mockReturnValue({
      ...mockPoiListsSetting,
    });
    return (
      expectSaga(Sagas.getPoiListsSettingSaga)
        // Assert that the `put` will eventually happen.
        .put(Actions.setPoiListsSetting(mockPoiListsSetting))
        .run()
    );
  });

  it("posts a new Poi to the selected list", () => {
    const action = Actions.postPoiListToSetting({ payload: mockPoiListName });
    return expectSaga(Sagas.postPoiListsToSettingSaga, action)
      .put(Actions.addPoiListToSetting({ payload: mockPoiListName }))
      .run();
  });

  it("deletes the selected Poi from the selected list", () => {
    const action = Actions.deletePoiListFromSetting({ name: "mockName" });
    return expectSaga(Sagas.deletePoiListFromSettingSaga, action)
      .put(Actions.removePoiListsFromSetting({ name: "mockName" }))
      .run();
  });
});
