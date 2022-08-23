import { createSelector } from "reselect";
import { IDataState } from "./data.types";

const selectState = (state: IDataState) => state;
const selectDataState = (state: IDataState) => state.resultData;

export const selectDataCollection = createSelector(
  [selectDataState],
  (collection) => collection.data
);

export const selectRegionCollection = createSelector(
  [selectDataCollection],
  (regions) =>
    regions
      .filter(
        (value, index, self) =>
          index === self.findIndex((t) => t.Region === value.Region)
      )
      .map((region) => region.Region)
);

export const selectIsDataFetching = createSelector(
  [selectState],
  (fetch: any) => fetch.isFetching
);

export const selectIsDataLoaded = createSelector(
  [selectState],
  (load: any) => load.isLoaded
);
