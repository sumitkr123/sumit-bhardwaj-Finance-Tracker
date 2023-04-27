import { useEffect, useState } from "react";

import { TransactionData } from "../../components/transaction_data";

import logo from "../../logo.svg";
import "../../App.css";
import "./css/transaction.css";
import { Link } from "react-router-dom";
import { Pagination } from "./components/pagination";

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

const fixedimit = 2;

month.map((month) => monthYears.push(`${month} ${currentyear}`));

const groupby = [
  "tdate",
  "monthyear",
  "ttype",
  "FromAc",
  "ToAc",
  "amount",
  "notes",
];

export const AllData = () => {
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

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

  const [groupColumn, setGroupColumn] = useState("");
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("userdata") !== null &&
      localStorage.getItem("userdata") !== undefined
    ) {
      let existingData = JSON.parse(localStorage.getItem("userdata"));

      setTransactions(existingData);
      setInitTransactions(existingData);

      let totpage = transactions.length / fixedimit;

      let pagelist = [];

      for (let i = 1; i <= totpage; i++) {
        pagelist.push(i);
      }

      setPagination({
        ...pagination,
        totalpage: totpage,
        pages: pagelist,
      });
    }
    // eslint-disable-next-line
  }, [transactions.length]);

  useEffect(() => {
    setSorting({
      ...sorting,
      sortingOrder: clickCount === 1 ? "asc" : clickCount === 2 ? "desc" : "",
    });
    // eslint-disable-next-line
  }, [clickCount]);

  useEffect(() => {
    let getAllTransactions = [...transactions];

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

    setTransactions(getAllTransactions);
    // eslint-disable-next-line
  }, [sorting]);

  useEffect(() => {
    let temp = [...transactions];
    let newtemp = [];

    let result = temp.reduce((group, product) => {
      const value = product[groupColumn];

      group[value] = group[value] ?? [];

      group[value].push(product);

      return group;
    }, {});

    setGroupedData([result]);
  }, [groupColumn]);

  function setSortingColumn(column, type) {
    if (sorting.sortingColumnName !== column) {
      setClickCount(1);
    } else {
      setClickCount(clickCount < 3 ? clickCount + 1 : 1);
    }
    setSorting({
      ...sorting,
      // sortingOrder: clickCount === 1 ? "asc" : clickCount === 2 ? "desc" : "",
      sortingColumnName: column,
      columnValueType: type,
    });
  }

  function changepageno(pageno) {
    setPagination({
      ...pagination,
      pageno: pageno,
    });
  }

  function groupdata(event) {
    setGroupColumn(event.target.value);
  }

  if (transactions.length === 0) {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="groupdiv">
          <label>Group by :-</label>
          <select type="text" name="group" onChange={(e) => groupdata(e)}>
            <option value={""}>Select any column</option>
            {groupby.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <br></br>
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
                (pagination.pageno - 1) * fixedimit,
                pagination.pageno * fixedimit
              )
              .map((tdata, index) => (
                <TransactionData
                  transaction={tdata}
                  key={index}
                  index={index}
                />
              ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} changepageno={changepageno} />

        <br></br>
        <br></br>
        {console.log(groupedData)}
        {groupedData.length !== 0 && (
          <>
            {groupedData.map((item, index) => (
              <>
                {Object.keys(item).map((value) => (
                  <>
                    {value !== "undefined" && (
                      <>
                        <h1>{value}</h1>
                        <table className="table">
                          <thead className="header">
                            <tr className="headerrow">
                              <th className="th">Transaction-Date</th>
                              <th className="th">Month-Year</th>
                              <th className="th">Transaction-Type</th>
                              <th className="th">From-A/c</th>
                              <th className="th">To-A/c</th>
                              <th className="th">Amount</th>
                              <th className="th">Receipt</th>
                              <th className="th">Notes</th>
                              <th className="th">Action</th>
                            </tr>
                          </thead>
                          <tbody className="tabcontent">
                            {item[value].map((item) => (
                              <TransactionData
                                transaction={item}
                                key={index}
                                index={index}
                              />
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </>
                ))}
              </>
            ))}
          </>
        )}

        <br />
        <Link to={`/`}>Go to Home</Link>
      </div>
    </>
  );
};
