import { useEffect, useState } from "react";

import { TransactionData } from "./components/transaction_data";

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

month.map((month) => monthYears.push(`${month} ${currentyear}`));

// const fixedimit = 2;

const groupby = [
  { tdate: "Transaction-date" },
  { monthyear: "Month-year" },
  { ttype: "Transaction-type" },
  { FromAc: "From-Ac" },
  { ToAc: "To-Ac" },
  { amount: "Amount" },
  { notes: "Notes" },
];

export const AllData = () => {
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [groupedData, setGroupedData] = useState([]);

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

  function groupdata(event) {
    let temp = [...transactions];

    let result = {};

    temp.forEach((item) => {
      const value = item[event.target.value];

      result[value] = result[value] ?? [];
      result[value].push(item);
    });

    setGroupedData([result]);
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
              <option key={index} value={Object.keys(item)}>
                {Object.values(item)}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <br></br>
        <TransactionData
          transactions={transactions}
          initTransactions={initTransactions}
          setData={setTransactions}
          fromGroup={false}
          // setSortingColumn={setSortingColumn}
        />

        <br></br>
        <br></br>
        {groupedData.length !== 0 &&
          groupedData.map((item) =>
            Object.keys(item).map(
              (value) =>
                value !== "undefined" && (
                  <div key={value}>
                    <h1>{value}</h1>
                    <TransactionData
                      transactions={item[value]}
                      setData={setTransactions}
                      initTransactions={initTransactions}
                      fromGroup={true}
                      // setData={setGroupedData}
                      // setSortingColumn={setSortingColumn}
                    />
                  </div>
                )
            )
          )}

        <br />
        <Link to={`/`}>Go to Home</Link>
      </div>
    </>
  );
};
