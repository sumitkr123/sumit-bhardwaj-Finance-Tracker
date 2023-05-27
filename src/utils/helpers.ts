import { Transaction } from "../models/exports";
import { month } from "./constants";

export const doSort = (
  getAllTransactions: Transaction[],
  sorting: { [key: string]: string }
) => {
  getAllTransactions.sort((a, b) => {
    switch (sorting.columnValueType) {
      case "number":
        return sorting.sortingOrder === "asc"
          ? parseInt(a[sorting.sortingColumnName]) >
            parseInt(b[sorting.sortingColumnName])
            ? 1
            : parseInt(a[sorting.sortingColumnName]) <
              parseInt(b[sorting.sortingColumnName])
            ? -1
            : 0
          : parseInt(a[sorting.sortingColumnName]) <
            parseInt(b[sorting.sortingColumnName])
          ? 1
          : parseInt(a[sorting.sortingColumnName]) >
            parseInt(b[sorting.sortingColumnName])
          ? -1
          : 0;

      case "monthyear":
        let fmonth = a[sorting.sortingColumnName].split(" ")[0];
        let smonth = b[sorting.sortingColumnName].split(" ")[0];

        let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
        let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

        return sorting.sortingOrder === "asc"
          ? month.indexOf(fmonth) > month.indexOf(smonth) && fyear >= syear
            ? 1
            : month.indexOf(fmonth) < month.indexOf(smonth) && fyear <= syear
            ? -1
            : 0
          : month.indexOf(fmonth) < month.indexOf(smonth) && fyear <= syear
          ? 1
          : month.indexOf(fmonth) > month.indexOf(smonth) && fyear >= syear
          ? -1
          : 0;

      case "date":
        let fdate = new Date(a[sorting.sortingColumnName]);
        let sdate = new Date(b[sorting.sortingColumnName]);

        return sorting.sortingOrder === "asc"
          ? fdate > sdate
            ? 1
            : fdate < sdate
            ? -1
            : 0
          : fdate < sdate
          ? 1
          : fdate > sdate
          ? -1
          : 0;

      default:
        return sorting.sortingOrder === "asc"
          ? a[sorting.sortingColumnName] > b[sorting.sortingColumnName]
            ? 1
            : a[sorting.sortingColumnName] < b[sorting.sortingColumnName]
            ? -1
            : 0
          : a[sorting.sortingColumnName] < b[sorting.sortingColumnName]
          ? 1
          : a[sorting.sortingColumnName] > b[sorting.sortingColumnName]
          ? -1
          : 0;
    }
  });
};
