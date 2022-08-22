import { createSelector } from "reselect";
import { IState } from "./data.reducer";

const selectData = (state: IState) => state;

export const selectDataCollection = createSelector(
  [selectData],
  (state: IState) => state.data
);

export const selectIsDataFetching = createSelector(
  [selectData],
  (state: IState) => state.isFetching
);

export const selectIsDataLoaded = createSelector(
  [selectData],
  (state: IState) => state.isLoaded
);

export const selectTotalCost = createSelector(
  [selectData],
  (state: IState) => state.data
);
