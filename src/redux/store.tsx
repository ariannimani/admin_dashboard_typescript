import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./root.reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const sagaMiddleWare = createSagaMiddleware();

const middlewares =
  //process.env.NODE_ENV === "developement"?
  [sagaMiddleWare, thunk, logger];
//: [sagaMiddleWare, thunk];

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
