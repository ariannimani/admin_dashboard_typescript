import { createSelector } from "reselect";
import { IDataState } from "./data.types";

const selectState = (state: IDataState) => state;
const selectDataState = (state: IDataState) => state.resultData;

export const selectTimeFrameValue = (state: IDataState, ownProps: any) => {
  return ownProps.isSelected;
};

const d = new Date();
let year = d.getFullYear();
let lastYear = d.getFullYear() - 1;

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
    const Profit = profit
      .filter((date) => Number(date["Order Date"].slice(-4)) === year)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

    return Profit;
  }
);

export const selectTotalIncreaseData = createSelector(
  [selectDataCollection],
  (profitPercentage) => {
    const ProfitCurrentYear = profitPercentage
      .filter((date) => Number(date["Order Date"].slice(-4)) === year)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

    const ProfitLastYear = profitPercentage
      .filter((date) => Number(date["Order Date"].slice(-4)) === lastYear)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

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

export const selectOrderData = createSelector(
  [selectDataCollection],
  (units) => {
    const CurrentYearData = units.filter(
      (date) => Number(date["Order Date"].slice(-4)) === year
    );
    const MostSoldItems = Array.from(
      CurrentYearData.reduce(
        (m, { "Item Type": type, "Units Sold": sold }) =>
          m.set(type, (m.get(type) || 0) + sold),
        new Map<string, number>()
      ),
      ([type, sold]) => ({ type, sold })
    );
    return MostSoldItems;
  }
);

export const selectLast60DaysData = createSelector(
  [selectDataCollection],
  (units) => {
    const date = units
      .filter((date) => new Date(date["Order Date"]))
      .map((item) => new Date(item["Order Date"]).getTime() / 1000);

    const maxDate = Math.max.apply(null, date);

    const previousWeek = Number((maxDate - 60 * 24 * 60 * 60) * 1000);

    const FinalData = units.filter(
      (unit) => new Date(unit["Order Date"]).getTime() > previousWeek
    );

    return FinalData;
  }
);
