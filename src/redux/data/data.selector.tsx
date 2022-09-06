import { object } from "prop-types";
import { createSelector } from "reselect";
import { IDataState } from "./data.types";

const selectState = (state: IDataState) => state;
const selectDataState = (state: IDataState) => state.resultData;

//NEED TO FIX DropDownMenu
export const selectTimeFrameValue =
  () => (state: IDataState, ownProps: any) => {
    const selected: number = ownProps.items.indexOf(ownProps.isSelected);
    let filterValue: number = 0;
    if (selected === 0) {
      filterValue = 30;
    } else if (selected === 1) {
      filterValue = 90;
    } else if (selected === 2) {
      filterValue = 365;
    } else {
      filterValue = 0;
    }
    return filterValue;
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

//Select Years
export const selectYears = createSelector([selectDataCollection], (years) => {
  return years.map((year) => year["Order Date"].slice(-4));
});

////Filter Sum By Year
//export const selectSumByYear = createSelector(
//  [selectDataCollection],
//  (data) => {
//    return data
//      .filter((year) => Number(year["Order Date"].slice(-4)) === 2022)
//      .map((data) => data["Total Profit"])
//      .reduce((sum, a) => sum + a, 0);
//  }
//);

//NEED TO FIX
export const selectProfitData = createSelector(
  [selectDataCollection],
  (profit) => {
    const date = profit
      .filter((date) => new Date(date["Order Date"]))
      .map((item) => new Date(item["Order Date"]).getTime() / 1000);

    const maxDate = Math.max.apply(null, date);

    const previousWeek = Number((maxDate - 30 * 24 * 60 * 60) * 1000);

    const Profit = profit
      .filter((unit) => new Date(unit["Order Date"]).getTime() > previousWeek)
      .map((data) => data["Total Profit"])
      .reduce((sum, a) => sum + a, 0);

    return Profit;
  }
);

export const selectExpensesData = createSelector(
  [selectDataCollection],
  (profit) => {
    const date = profit
      .filter((date) => new Date(date["Order Date"]))
      .map((item) => new Date(item["Order Date"]).getTime() / 1000);

    const maxDate = Math.max.apply(null, date);

    const previousWeek = Number((maxDate - 30 * 24 * 60 * 60) * 1000);

    const Profit = profit
      .filter((unit) => new Date(unit["Order Date"]).getTime() > previousWeek)
      .map((data) => data["Total Cost"])
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

export const selectTotalExpensesData = createSelector(
  [selectDataCollection],
  (profitPercentage) => {
    const ProfitCurrentYear = profitPercentage
      .filter((date) => Number(date["Order Date"].slice(-4)) === year)
      .map((data) => data["Total Cost"])
      .reduce((sum, a) => sum + a, 0);

    const ProfitLastYear = profitPercentage
      .filter((date) => Number(date["Order Date"].slice(-4)) === lastYear)
      .map((data) => data["Total Cost"])
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
    //const date = units
    //  .filter((date) => new Date(date["Order Date"]))
    //  .map((item) => new Date(item["Order Date"]).getTime() / 1000);

    //const maxDate = Math.max.apply(null, date);

    //const previousWeek = Number((maxDate - 60 * 24 * 60 * 60) * 1000);

    const FinalData = units.filter(
      (unit) => Number(unit["Order Date"].slice(-4)) === year
      //new Date(unit["Order Date"]).getTime()> previousWeek
    );

    return FinalData;
  }
);

export const selectAllData = createSelector([selectDataCollection], (units) =>
  units.filter(
    (unit) => unit //Number(unit["Order Date"].slice(-4)) === year
  )
);

export const selectTopOrdersData = createSelector([selectAllData], (orders) =>
  orders
    .map((i) => {
      return {
        orderID: i["Order ID"],
        item: i["Item Type"],
        country: i["Country"],
        date: i["Order Date"],
        units: i["Units Sold"],
        channel: i["Sales Channel"],
      };
    })
    .sort((a, b) => (Date.parse(a.date) > Date.parse(b.date) ? 1 : -1))
    .reverse()
    .slice(0, 5)
);

export const selectTopOnlineOfflineData = createSelector(
  [selectDataCollection],
  (units) => {
    const CurrentYearData = units.filter(
      (date) => Number(date["Order Date"].slice(-4)) === year
    );
    const OnlineOfflineData = Array.from(
      CurrentYearData.reduce(
        (m, { "Sales Channel": type, "Units Sold": sold }) =>
          m.set(type, (m.get(type) || 0) + sold),
        new Map<string, number>()
      ),
      ([type, sold]) => ({ type, sold })
    );
    return OnlineOfflineData;
  }
);

export const selectPriorityData = createSelector(
  [selectDataCollection],
  (units) => {
    const CurrentYearData = units.filter(
      (date) => Number(date["Order Date"].slice(-4)) === year
    );
    const PriorityItems = Array.from(
      CurrentYearData.reduce(
        (m, { "Order Priority": type, "Units Sold": sold }) =>
          m.set(type, (m.get(type) || 0) + sold),
        new Map<string, number>()
      ),
      ([type, sold]) => ({ type, sold })
    );

    const newObjArr = PriorityItems.map((obj) => {
      if (["L"].includes(obj.type)) {
        return { ...obj, type: "Low" };
      } else if (["M"].includes(obj.type)) {
        return { ...obj, type: "Medium" };
      } else if (["H"].includes(obj.type)) {
        return { ...obj, type: "High" };
      } else if (["C"].includes(obj.type)) {
        return { ...obj, type: "Neutral" };
      }
      return obj;
    });

    return newObjArr.sort((a, b) => (a.sold > b.sold ? 1 : -1)).reverse();
  }
);
