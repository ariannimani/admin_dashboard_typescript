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

export const selectProfitData = createSelector(
  [selectDataCollection],
  (profit) => {
    const d = new Date();
    let year = d.getFullYear();
    const Profit = profit
      .filter((date) => Number(date["Order Date"].slice(-4)) === year)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

    return Profit;
  }
);

export const selectTotalIncreaseData = createSelector(
  [selectDataCollection],
  (profit) => {
    const d = new Date();
    let year = d.getFullYear();
    let lastYear = d.getFullYear() - 1;

    const ProfitCurrentYear = profit
      .filter((date) => Number(date["Order Date"].slice(-4)) === year)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

    const ProfitLastYear = profit
      .filter((date) => Number(date["Order Date"].slice(-4)) === lastYear)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);
    console.log(ProfitCurrentYear, ProfitLastYear);

    return ((ProfitCurrentYear - ProfitLastYear) / ProfitCurrentYear) * 100;
  }
);

export const selectIsDataFetching = createSelector(
  [selectState],
  (fetch: any) => fetch.isFetching
);

export const selectIsDataLoaded = createSelector(
  [selectState],
  (load: any) => load.isLoaded
);
