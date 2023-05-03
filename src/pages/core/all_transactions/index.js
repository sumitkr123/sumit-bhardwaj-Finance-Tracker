import { useEffect, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import logo from "../../../logo.svg";
import "../../../App.css";
import "./css/transaction.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../providers/authprovider";

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

const fixedimit = 2;

const currency = {
  rupee: <span>&#8377;</span>,
  dollar: <span>&#36;</span>,
  pound: <span>&#163;</span>,
  yen: <span>&#165;</span>,
  euro: <span>&#8364;</span>,
};

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
  // eslint-disable-next-line
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [groupedData, setGroupedData] = useState([]);

  const [searchedData, setSearchedData] = useState([]);

  const auth = useAuth();

  // eslint-disable-next-line
  const [userData, setUserData] = useState(auth.user);

  useEffect(() => {
    if (userData !== undefined && userData !== null) {
      if (
        localStorage.getItem(userData.email) !== null &&
        localStorage.getItem(userData.email) !== undefined
      ) {
        let existingData = JSON.parse(localStorage.getItem(userData.email));

        setTransactions(existingData);
        setInitTransactions(existingData);
      }
    }
  }, [userData]);

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

  function searchData(event) {
    let temp = [...transactions];

    let result = [];

    let searchvalue = event.target.value;

    if (
      searchvalue !== null &&
      searchvalue !== undefined &&
      searchvalue !== ""
    ) {
      let regex = new RegExp("^" + searchvalue + "+");

      temp.forEach((mainitem) => {
        Object.keys(mainitem).forEach((item) => {
          if (mainitem[item].toString().match(regex)) {
            result.push(mainitem);
          }
        });
      });

      setSearchedData(result);
    } else {
      setSearchedData([]);
    }
  }

  function amountFormatter(amount, type) {
    let newamount = amount.toString();
    let length = newamount.length;
    let newstr = "";

    if (length <= 3) {
      newstr += newamount;
    } else {
      let j = 0;
      newamount
        .split("")
        .reverse()
        .forEach((item) => {
          if (j === 3) {
            newstr = newstr + "," + item;
          } else if (j % 2 !== 0 && j > 3) {
            newstr = newstr + "," + item;
          } else {
            newstr += item;
          }

          j++;
        });
      newstr = newstr.split("").reverse().join("");
    }

    newstr = (
      <p>
        {type !== null && type !== undefined && type !== ""
          ? currency[type.trim().toLowerCase()]
          : currency.rupee}
        {newstr}
      </p>
    );

    return newstr;
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
        <br></br>
        <br></br>
        {transactions.length !== 0 && (
          <>
            <h1>Sorting with Pagination</h1>
            <TransactionData
              transactions={transactions}
              month={month}
              fixedimit={fixedimit}
              amountFormatter={amountFormatter}
            />
            <br></br>
            <br></br>
          </>
        )}

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
        {groupedData.length !== 0 &&
          Object.keys(groupedData[0]).map(
            (value, index) =>
              value !== "undefined" && (
                <div key={value}>
                  {index === 0 && (
                    <>
                      <br></br>
                      <br></br>
                      <h1>Group-by with Sorting & Pagination</h1>
                      <br></br>
                      <br></br>
                    </>
                  )}
                  <h1>{value}</h1>
                  <TransactionData
                    transactions={groupedData[0][value]}
                    month={month}
                    fixedimit={fixedimit}
                    amountFormatter={amountFormatter}
                  />
                  <br></br>
                  <br></br>
                </div>
              )
          )}

        <div className="searchdiv">
          <label>Search :-</label>
          <input type="text" name="search" onChange={(e) => searchData(e)} />
        </div>
        <br></br>
        <br></br>

        {searchedData.length !== 0 && (
          <>
            <h1>Searched data</h1>
            <TransactionData
              transactions={searchedData}
              month={month}
              fixedimit={fixedimit}
              amountFormatter={amountFormatter}
            />
          </>
        )}

        <br />
        <Link to={`/`}>Go to Home</Link>
      </div>
    </>
  );
};
