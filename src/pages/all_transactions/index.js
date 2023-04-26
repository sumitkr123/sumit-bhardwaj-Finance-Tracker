import { useEffect, useState } from "react";

import { TransactionData } from "../../components/transaction_data";

import logo from "../../logo.svg";
import "../../App.css";
import "./css/transaction.css";
import { Link } from "react-router-dom";

export const AllData = () => {
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (
      localStorage.getItem("userdata") !== null &&
      localStorage.getItem("userdata") !== undefined
    ) {
      let existingData = JSON.parse(localStorage.getItem("userdata"));

      setTransactions(existingData);
      setInitTransactions(existingData);
    }
  }, []);

  useEffect(() => {
    setSorting({
      ...sorting,
      sortingOrder: clickCount === 1 ? "asc" : clickCount === 2 ? "desc" : "",
    });
  }, [clickCount]);

  useEffect(() => {
    let getAllTransactions = [...transactions];

    let temp = [];

    if (sorting.sortingOrder === "asc") {
      for (let i = 0; i < getAllTransactions.length; i++) {
        for (let j = i + 1; j < getAllTransactions.length; j++) {
          if (sorting.columnValueType === "number") {
            if (
              parseInt(getAllTransactions[i][sorting.sortingColumnName]) >
              parseInt(getAllTransactions[j][sorting.sortingColumnName])
            ) {
              temp = getAllTransactions[i];
              getAllTransactions[i] = getAllTransactions[j];
              getAllTransactions[j] = temp;
            }
          } else {
            if (
              getAllTransactions[i][sorting.sortingColumnName] >
              getAllTransactions[j][sorting.sortingColumnName]
            ) {
              temp = getAllTransactions[i];
              getAllTransactions[i] = getAllTransactions[j];
              getAllTransactions[j] = temp;
            }
          }
        }
      }
    }
    if (sorting.sortingOrder === "desc") {
      for (let i = 0; i < getAllTransactions.length; i++) {
        for (let j = i + 1; j < getAllTransactions.length; j++) {
          if (sorting.columnValueType === "number") {
            if (
              parseInt(getAllTransactions[i][sorting.sortingColumnName]) <
              parseInt(getAllTransactions[j][sorting.sortingColumnName])
            ) {
              temp = getAllTransactions[i];
              getAllTransactions[i] = getAllTransactions[j];
              getAllTransactions[j] = temp;
            }
          } else {
            if (
              getAllTransactions[i][sorting.sortingColumnName] <
              getAllTransactions[j][sorting.sortingColumnName]
            ) {
              temp = getAllTransactions[i];
              getAllTransactions[i] = getAllTransactions[j];
              getAllTransactions[j] = temp;
            }
          }
        }
      }
    }
    if (sorting.sortingOrder === "") {
      getAllTransactions = initTransactions;
    }

    setTransactions(getAllTransactions);
  }, [sorting]);

  function setSortingColumn(column, type) {
    if (sorting.sortingColumnName !== column) {
      setClickCount(1);
    } else {
      setClickCount(clickCount < 3 ? clickCount + 1 : 1);
    }
    setSorting({
      ...sorting,
      sortingColumnName: column,
      columnValueType: type,
    });
  }

  if (transactions.length === 0) {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }

  return (
    <div className="container">
      <table className="table">
        <thead className="header">
          <tr className="headerrow">
            <th className="th">Transaction-Date</th>
            <th className="th">Month-Year</th>
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
          {transactions.map((tdata, index) => (
            <TransactionData transaction={tdata} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <Link to={`/`}>Go to Home</Link>
    </div>
  );
};
