import React, { FunctionComponent, ReactElement } from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
  queries,
  Queries,
} from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { SagaStore } from "@store/index";
import rootReducer, { AppState } from "@reducers/index";

// add options initialState and store to the usual
type ExtraOptions = {
  initialState?: AppState;
  store?: SagaStore;
};

const render = <
  // supports generics for Queries and Container
  // copied types from RTL version
  Q extends Queries = typeof queries,
  C extends Element | DocumentFragment = HTMLElement
>(
  ui: ReactElement,
  // options argument includes the additional redux options
  options: ExtraOptions & RenderOptions<Q, C> = {}
): // returns the standard result plus a store property
RenderResult<Q, C> & { store: SagaStore } => {
  // destructure additional properties from the options and set defaults
  const {
    initialState = undefined,
    store = createStore(rootReducer, initialState),
    ...renderOptions
  } = options;
  const origDispatch = store.dispatch;
  store.dispatch = jest.fn(origDispatch);

  // define a new Wrapper which includes a redux store Provider
  // @ts-ignore
  const Wrapper: FunctionComponent = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    // call the regular RTL render function
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    // return store alongside the the other return values
    store,
  };
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
