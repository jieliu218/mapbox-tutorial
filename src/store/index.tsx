import { applyMiddleware, createStore, Store } from "redux";
import createSagaMiddleware, { Task, SagaMiddleware } from "redux-saga";
import rootReducer, { initialState } from "@reducers/index";
import rootSaga from "@sagas/index";

const bindMiddleware = (middleware: [SagaMiddleware]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    var createLogger = require("redux-logger").createLogger;
    return composeWithDevTools(applyMiddleware(...middleware, createLogger()));
  }
  return applyMiddleware(...middleware);
};

export interface SagaStore extends Store {
  sagaTask: Task;
}

// 1: Create the middleware
const sagaMiddleware = createSagaMiddleware();

// 2: Add an extra parameter for applying middleware:
export const store = createStore(
  rootReducer,
  initialState,
  bindMiddleware([sagaMiddleware])
);

sagaMiddleware.run(rootSaga);
