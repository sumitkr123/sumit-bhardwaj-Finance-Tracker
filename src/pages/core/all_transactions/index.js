import { useMemo, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import "../../../assets/styles/transaction.css";
import { Link } from "react-router-dom";
import { groupby } from "../../../utils/constants";
import { ErrorPage } from "../../../components/errorpage";

import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";

export const AllData = () => {
  const transactions = useSelector((state) => state.transactions);

  const [newtransactions, setNewTransactions] = useState([]);

  const [groupedData, setGroupedData] = useState([]);

  const [groupVal, setGroupVal] = useState("");

  const cookie = new Cookies();

  useMemo(() => {
    setNewTransactions(transactions);
  }, [transactions]);

  useMemo(() => {
    let temp = [...transactions];

    let result = {};

    temp.forEach((item) => {
      const value = item[groupVal];

      result[value] = result[value] ?? [];
      result[value].push(item);
    });
    setGroupedData([result]);
  }, [groupVal, transactions]);

  const logout = () => {
    let logoutstatus = window.confirm("Are you sure you want to logout..!");
    if (logoutstatus) {
      cookie.remove("auth_token", { path: "/" });
      window.location.reload();
    }
  };

  if (newtransactions.length === 0) {
    return (
      <ErrorPage
        errorTitle={"Oops Data Not Found..!"}
        errorSubTitle={"Go Add Some Data..!"}
        redirect={"create"}
      />
    );
  }

  return (
    <>
      <div className="container">
        <br></br>
        <br></br>
        <div className="headerdiv">
          <div className="groupdiv">
            <label>
              Group by :-
              <select
                type="text"
                name="group"
                onChange={(e) => setGroupVal(e.target.value)}
              >
                <option value={""}>None</option>
                {groupby.map((item, index) => (
                  <option key={index} value={Object.keys(item)}>
                    {Object.values(item)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="logoutdiv">
            <button type="button" className="logout" onClick={() => logout()}>
              Logout
            </button>
          </div>
        </div>

        <br></br>
        <br></br>

        {groupedData.length !== 0 && groupVal
          ? Object.keys(groupedData[0]).map(
              (value) =>
                value !== "undefined" && (
                  <div key={value}>
                    <div className="wholeTabWithEverything">
                      <br></br>
                      <br></br>
                      <h1>{value}</h1>
                      <TransactionData transactions={groupedData[0][value]} />

                      <br></br>
                      <br></br>
                    </div>
                  </div>
                )
            )
          : newtransactions.length !== 0 && (
              <div className="wholeTabWithEverything">
                <TransactionData transactions={newtransactions} />

                <br></br>
                <br></br>
              </div>
            )}
        <br />

        <Link to={`create`}>Add Transactions</Link>
      </div>
    </>
  );
};
