export enum DataActionTypes {
  FETCH_DATA_START = "@@projects/FETCH_DATA_START",
  FETCH_DATA_SUCCESS = "@@projects/FETCH_DATA_SUCCESS",
  FETCH_DATA_FAILURE = "@@projects/FETCH_DATA_FAILURE",
}

export interface IDataState {
  resultData: IDataFetch;
}

export interface IDataFetch {
  readonly data: IDataItem[];
  readonly isFetching: boolean;
  readonly isLoaded: boolean;
  readonly errorMessage: Error | undefined;
}

//export interface IData {
//  data: IDataItem[]
//}

export interface IDataItem {
  Region: string;
  Country: string;
  "Item Type": string;
  "Sales Channel": string;
  "Order Priority": string;
  "Order Date": string;
  "Order ID": number;
  "Ship Date": string;
  "Units Sold": number;
  "Unit Price": number;
  "Unit Cost": number;
  "Total Revenue": number;
  "Total Cost": number;
  "Total Profit": number;
}

export interface IDataMap {
  [key: string]: IDataItem[];
}
