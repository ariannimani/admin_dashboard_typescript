import { DataActionTypes } from "./data.types";
import axios from "axios";
import { store } from "../store";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../utils/action.utils";
import { IState } from "./data.reducer";

export type TFetchDataStart = Action<DataActionTypes.FETCH_DATA_START>;

export type TFetchDataSucceeded = ActionWithPayload<
  DataActionTypes.FETCH_DATA_SUCCESS,
  IState[]
>;

export type TFetchDataFailed = ActionWithPayload<
  DataActionTypes.FETCH_DATA_FAILURE,
  Error
>;

export type TFetchData =
  | TFetchDataStart
  | TFetchDataSucceeded
  | TFetchDataFailed;

export const fetchDataStartAction = withMatcher(
  (): TFetchDataStart => createAction(DataActionTypes.FETCH_DATA_START)
);

export const fetchDataSucceededAction = withMatcher(
  (data: IState[]): TFetchDataSucceeded =>
    createAction(DataActionTypes.FETCH_DATA_SUCCESS, data)
);

export const fetchDataFailedAction = withMatcher(
  (errorMessage: Error): TFetchDataFailed =>
    createAction(DataActionTypes.FETCH_DATA_FAILURE, errorMessage)
);

export type AppDispatch = typeof store.dispatch;

export const fetchDataAsync = () => async (dispatch: any) => {
  dispatch(fetchDataStartAction());
  try {
    const res = axios.get(
      `https://v1.nocodeapi.com/aarriiaann/csv2json/OJBlQIeexAuDWvwC`
    );
    const data = await res.then((result: any) => result.data.json);

    dispatch(fetchDataSucceededAction(data));
  } catch (e: any) {
    dispatch(fetchDataFailedAction(e));
  }
};
