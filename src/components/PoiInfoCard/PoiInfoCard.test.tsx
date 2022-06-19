import PoiInfoCard from "./PoiInfoCard";
import { render, screen, fireEvent } from "@utils/testUtils";
import { FAVORIATES, POI_LISTS_SETTING, WANT_TO_GO } from "@utils/constants";
import { postPoiToLists, deletePoiFromLists } from "@actions/PoiListsActions";
import { mockPoiInfo, mockFeature } from "@utils/dummyData";

const mockInitialState = {
  poiLists: {
    [FAVORIATES]: [],
    [WANT_TO_GO]: [],
  },
  poiListsSetting: POI_LISTS_SETTING,
};

const createPoiInfoCard = (feature, state) => {
  // create with an initial redux state
  const initialState = state;
  const options = { initialState };
  // render to the screen
  return render(<PoiInfoCard feature={feature} />, options);
};

describe("PoiInfoCard", () => {
  it("renders PoiInfoCard", async () => {
    createPoiInfoCard(mockFeature, mockInitialState);
    expect(screen.getByText("mockName")).toBeInTheDocument();
    expect(screen.getByText("mockType")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("save-to-list"));
    expect(screen.getByText(POI_LISTS_SETTING[FAVORIATES])).toBeInTheDocument();
    expect(screen.getByText(POI_LISTS_SETTING[WANT_TO_GO])).toBeInTheDocument();
  });

  it("adds poi to selected list", async () => {
    const { store } = createPoiInfoCard(mockFeature, mockInitialState);
    fireEvent.click(screen.getByTestId("save-to-list"));
    fireEvent.click(screen.getByText(POI_LISTS_SETTING[FAVORIATES]));
    expect(store.dispatch).toHaveBeenCalledWith(
      postPoiToLists({ listName: FAVORIATES, payload: mockPoiInfo })
    );
  });

  it("deletes poi from selected list", async () => {
    const mockState = {
      poiLists: {
        [FAVORIATES]: [mockPoiInfo],
        [WANT_TO_GO]: [],
      },
      poiListsSetting: POI_LISTS_SETTING,
    };
    const { store } = createPoiInfoCard(mockFeature, mockState);
    fireEvent.click(screen.getByTestId("save-to-list"));
    fireEvent.click(screen.getByText(POI_LISTS_SETTING[FAVORIATES]));
    expect(store.dispatch).toHaveBeenCalledWith(
      deletePoiFromLists({ listName: FAVORIATES, id: 5587319341 })
    );
  });
});
