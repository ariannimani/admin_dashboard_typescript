import {
  fetchDataStartAction,
  fetchDataSucceededAction,
  fetchDataFailedAction,
} from "./data.action";
import { AnyAction } from "redux";
import { IDataFetch } from "./data.types";

const INITIAL_STATE: IDataFetch = {
  data: [],
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
};

const dataReducer = (
  state = INITIAL_STATE,
  action = {} as AnyAction
): IDataFetch => {
  if (fetchDataStartAction.match(action)) {
    return {
      ...state,
      isFetching: true,
      isLoaded: false,
    };
  }
  if (fetchDataSucceededAction.match(action)) {
    return {
      ...state,
      isFetching: false,
      isLoaded: true,
      data: action.payload,
    };
  }

  if (fetchDataFailedAction.match(action)) {
    return {
      ...state,
      isFetching: false,
      isLoaded: false,
      errorMessage: action.payload,
    };
  }
  return state;

  //switch (action.type) {
  //  case DataActionTypes.FETCH_DATA_START:
  //    return {
  //      ...state,
  //      isFetching: true,
  //      isLoaded: false,
  //    };
  //  case DataActionTypes.FETCH_DATA_SUCCESS:
  //    return {
  //      ...state,
  //      isFetching: false,
  //      isLoaded: true,
  //      data: action.payload,
  //    };
  //  case DataActionTypes.FETCH_DATA_FAILURE:
  //    return {
  //      ...state,
  //      isFetching: false,
  //      isLoaded: false,
  //      errorMessage: action.payload,
  //    };
  //  default:
  //    return state;
  //}
};

export default dataReducer;
