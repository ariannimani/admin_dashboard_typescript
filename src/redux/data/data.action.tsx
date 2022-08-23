import { DataActionTypes, IDataItem } from "./data.types";
//import axios from "axios";
import { store } from "../store";
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../utils/action.utils";
import { SalesData } from "./data";

export type TFetchDataStart = Action<DataActionTypes.FETCH_DATA_START>;

export type TFetchDataSucceeded = ActionWithPayload<
  DataActionTypes.FETCH_DATA_SUCCESS,
  IDataItem[]
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
  (result: IDataItem[]): TFetchDataSucceeded =>
    createAction(DataActionTypes.FETCH_DATA_SUCCESS, result)
);

export const fetchDataFailedAction = withMatcher(
  (errorMessage: Error): TFetchDataFailed =>
    createAction(DataActionTypes.FETCH_DATA_FAILURE, errorMessage)
);

export type AppDispatch = typeof store.dispatch;

export const fetchDataAsync = () => async (dispatch: any) => {
  dispatch(fetchDataStartAction());
  try {
    //const res = axios.get(
    //  `https://api.publicapis.org/entries
    //  `
    //);
    //const data = await res.then((result: any) => result.data.json);

    //Dummy Fetch Data
    const myPromise = new Promise(function (resolve, reject) {
      resolve(SalesData);
    });
    const data = await myPromise.then((result: any) => result);

    dispatch(fetchDataSucceededAction(data));
  } catch (e: any) {
    dispatch(fetchDataFailedAction(e));
  }
};
