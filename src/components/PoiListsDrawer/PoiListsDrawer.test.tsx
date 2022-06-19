import PoiListsDrawer from "./PoiListsDrawer";
import { render, screen, fireEvent } from "@utils/testUtils";
import { FAVORIATES, POI_LISTS_SETTING, WANT_TO_GO } from "@utils/constants";
import { deletePoiFromLists } from "@actions/PoiListsActions";
import * as MapContext from "@utils/MapContext";
import { mockPoiLists } from "@utils/dummyData";

const mockInitialState = {
  poiLists: mockPoiLists,
  poiListsSetting: POI_LISTS_SETTING,
};

const createPoiListsDrawer = (state) => {
  // create with an initial redux state
  const initialState = state;
  const options = { initialState };
  // render to the screen
  return render(<PoiListsDrawer />, options);
};

describe("PoiListsDrawer", () => {
  it("renders PoiListsDrawer", async () => {
    createPoiListsDrawer(mockInitialState);
    expect(screen.getByTestId("open-lists-drawer")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("open-lists-drawer"));
    expect(screen.getByText(POI_LISTS_SETTING[FAVORIATES])).toBeInTheDocument();
    expect(screen.getByText(POI_LISTS_SETTING[WANT_TO_GO])).toBeInTheDocument();
    expect(screen.getAllByText("mockName")).toHaveLength(1);

    // Open Collapse in the drawer
    fireEvent.click(screen.getByText(POI_LISTS_SETTING[WANT_TO_GO]));
    expect(screen.getAllByText("mockName")).toHaveLength(2);
  });

  it("deletes poi from selected list in the drawer", async () => {
    const { store } = createPoiListsDrawer(mockInitialState);

    fireEvent.click(screen.getByTestId("open-lists-drawer"));
    const deleteBtns = screen.getAllByText("Delete");
    expect(deleteBtns).toHaveLength(2);

    fireEvent.click(deleteBtns[0]);
    expect(store.dispatch).toHaveBeenCalledWith(
      deletePoiFromLists({ listName: FAVORIATES, id: 5587319341 })
    );
  });

  it("flies to selected Poi", async () => {
    const mockFlyTo = jest.fn();
    jest
      .spyOn(MapContext, "useMap")
      .mockImplementation(() => [{ flyTo: mockFlyTo }]);

    createPoiListsDrawer(mockInitialState);
    fireEvent.click(screen.getByTestId("open-lists-drawer"));
    const showBtns = screen.getAllByText("Show");
    expect(showBtns).toHaveLength(2);
    fireEvent.click(showBtns[0]);
    expect(mockFlyTo).toHaveBeenCalledWith({
      center: [1, 2],
      essential: true,
      zoom: 3,
    });
  });
});
