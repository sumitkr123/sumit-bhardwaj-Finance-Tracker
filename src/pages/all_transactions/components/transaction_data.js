import { Link } from "react-router-dom";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";

const today = new Date();
const currentyear = today.getFullYear();

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthYears = [];

month.map((month) => monthYears.push(`${month} ${currentyear}`));

const fixedimit = 3;

// Buggy code group by sort error...

export const TransactionData = (props) => {
  const transactions = props.transactions;
  const initTransactions = props.initTransactions;
  const setCurrentData = props.setData;

  const [newData, setNewData] = useState([]);

  const fromGroup = props.fromGroup;

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });

  const [clickCount, setClickCount] = useState(0);

  const [pagination, setPagination] = useState({
    totalpage: 0,
    limit: fixedimit,
    pageno: 1,
    pages: [],
  });

  useEffect(() => {
    let totpage = Math.ceil(transactions.length / fixedimit);

    let pagelist = [];

    for (let i = 1; i <= totpage; i++) {
      pagelist.push(i);
    }

    setPagination({
      ...pagination,
      totalpage: totpage,
      pages: pagelist,
    });
  }, []);

  function changepageno(pageno) {
    setPagination({
      ...pagination,
      pageno: pageno,
    });
  }

  useEffect(() => {
    setSorting({
      ...sorting,
      sortingOrder: clickCount === 1 ? "asc" : clickCount === 2 ? "desc" : "",
    });
    // eslint-disable-next-line
  }, [clickCount]);

  useEffect(() => {
    let getAllTransactions =
      fromGroup === true ? [...newData] : [...transactions];

    if (sorting.sortingOrder === "asc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) >
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          if (
            monthYears.indexOf(a[sorting.sortingColumnName]) >
            monthYears.indexOf(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate > sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] > b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      // for (let i = 0; i < getAllTransactions.length; i++) {
      //   for (let j = i + 1; j < getAllTransactions.length; j++) {
      //     if (sorting.columnValueType === "number") {
      //       if (
      //         parseInt(getAllTransactions[i][sorting.sortingColumnName]) >
      //         parseInt(getAllTransactions[j][sorting.sortingColumnName])
      //       ) {
      //         temp = getAllTransactions[i];
      //         getAllTransactions[i] = getAllTransactions[j];
      //         getAllTransactions[j] = temp;
      //       }
      //     } else {
      //       if (
      //         getAllTransactions[i][sorting.sortingColumnName] >
      //         getAllTransactions[j][sorting.sortingColumnName]
      //       ) {
      //         temp = getAllTransactions[i];
      //         getAllTransactions[i] = getAllTransactions[j];
      //         getAllTransactions[j] = temp;
      //       }
      //     }
      //   }
      // }
    }
    if (sorting.sortingOrder === "desc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) <
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          if (
            monthYears.indexOf(a[sorting.sortingColumnName]) <
            monthYears.indexOf(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate < sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] < b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      // for (let i = 0; i < getAllTransactions.length; i++) {
      //   for (let j = i + 1; j < getAllTransactions.length; j++) {
      //     if (sorting.columnValueType === "number") {
      //       if (
      //         parseInt(getAllTransactions[i][sorting.sortingColumnName]) <
      //         parseInt(getAllTransactions[j][sorting.sortingColumnName])
      //       ) {
      //         temp = getAllTransactions[i];
      //         getAllTransactions[i] = getAllTransactions[j];
      //         getAllTransactions[j] = temp;
      //       }
      //     } else {
      //       if (
      //         getAllTransactions[i][sorting.sortingColumnName] <
      //         getAllTransactions[j][sorting.sortingColumnName]
      //       ) {
      //         temp = getAllTransactions[i];
      //         getAllTransactions[i] = getAllTransactions[j];
      //         getAllTransactions[j] = temp;
      //       }
      //     }
      //   }
      // }
    }
    if (sorting.sortingOrder === "") {
      getAllTransactions = initTransactions;
    }

    if (props.fromGroup === true) {
      setNewData(getAllTransactions);
    } else {
      setCurrentData(getAllTransactions);
    }

    // eslint-disable-next-line
  }, [sorting]);

  function setSortingColumn(column, type) {
    if (sorting.sortingColumnName !== column) {
      setClickCount(1);
    } else {
      setClickCount(clickCount < 3 ? clickCount + 1 : 1);
    }
    setSorting({
      ...sorting,
      sortingOrder:
        sorting.sortingOrder === ""
          ? "asc"
          : sorting.sortingOrder === "asc"
          ? "desc"
          : "",
      sortingColumnName: column,
      columnValueType: type,
    });
  }

  console.log('new',newData)

  return (
    <>
      <table className="table">
        <thead className="header">
          <tr className="headerrow">
            <th
              className="th"
              onClick={() => setSortingColumn("tdate", "date")}
            >
              Transaction-Date
            </th>
            <th
              className="th"
              onClick={() => setSortingColumn("monthyear", "monthyear")}
            >
              Month-Year
            </th>
            <th className="th" onClick={() => setSortingColumn("ttype")}>
              Transaction-Type
            </th>
            <th className="th" onClick={() => setSortingColumn("FromAc")}>
              From-A/c
            </th>
            <th className="th" onClick={() => setSortingColumn("ToAc")}>
              To-A/c
            </th>
            <th
              className="th"
              onClick={() => setSortingColumn("amount", "number")}
            >
              Amount
            </th>
            <th className="th">Receipt</th>
            <th className="th" onClick={() => setSortingColumn("notes")}>
              Notes
            </th>
            <th className="th">Action</th>
          </tr>
        </thead>
        <tbody className="tabcontent">
          {transactions
            .slice(
              (pagination.pageno - 1) * pagination.limit,
              pagination.pageno * pagination.limit
            )
            .map((tdata, index) => (
              <tr className="contentrow" key={tdata.id}>
                <td className="td">{tdata.tdate}</td>
                <td className="td">{tdata.monthyear}</td>
                <td className="td">{tdata.ttype}</td>
                <td className="td">{tdata.FromAc}</td>
                <td className="td">{tdata.ToAc}</td>
                <td className="td">{tdata.amount}</td>

                <td className="td">
                  {
                    // eslint-disable-next-line
                    <img
                      src={tdata.receipt}
                      width={80}
                      height={60}
                      alt="receiptimage"
                    />
                  }
                </td>

                <td className="td">{tdata.notes}</td>
                <td className="td">
                  <Link to={`/transactions/${tdata.id}`}>View</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} changepageno={changepageno} />
    </>
  );
};
