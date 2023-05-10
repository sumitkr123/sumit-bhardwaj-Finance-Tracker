import { useEffect, useMemo, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate } from "react-router-dom";
import { groupby } from "../../../utils/constants";
import { ErrorPage } from "../../../components/errorpage";
import { useTransactions } from "../../../providers/transaction_provider";

export const AllData = () => {
  const [transactions, setTransactions] = useTransactions();

  const [newtransactions, setNewTransactions] = useState([]);

  const [groupedData, setGroupedData] = useState([]);

  const [isGrouped, setIsGrouped] = useState(false);

  const [groupVal, setGroupVal] = useState("");

  const navigate = useNavigate();

  useMemo(() => {
    setNewTransactions(transactions);
  }, [transactions]);

  const logout = () => {
    let logoutstatus = window.confirm("Are you sure you want to logout..!");
    if (logoutstatus) {
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isGrouped === true) {
      groupdata(groupVal);
    }
  }, [transactions]);

  const groupdata = (event) => {
    setIsGrouped(true);
    let temp = [...transactions];

    let result = {};

    if (event.target) {
      if (event.target.value) {
        setGroupVal(event.target.value);

        temp.forEach((item) => {
          const value = item[event.target.value];

          result[value] = result[value] ?? [];
          result[value].push(item);
        });
        setGroupedData([result]);
      } else {
        setIsGrouped(false);
        setGroupedData([]);
      }
    } else {
      if (event) {
        temp.forEach((item) => {
          const value = item[event];

          result[value] = result[value] ?? [];
          result[value].push(item);
        });
        setGroupedData([result]);
      } else {
        setIsGrouped(false);
        setGroupedData([]);
      }
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
              <select type="text" name="group" onChange={(e) => groupdata(e)}>
                <option value={""}>Select any column</option>
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

        {groupedData.length !== 0
          ? Object.keys(groupedData[0]).map(
              (value) =>
                value !== "undefined" && (
                  <div key={value}>
                    <br></br>
                    <br></br>
                    <h1>{value}</h1>
                    <TransactionData transactions={groupedData[0][value]} />
                    <br></br>
                    <br></br>
                  </div>
                )
            )
          : newtransactions.length !== 0 && (
              <>
                <TransactionData transactions={newtransactions} />
                <br></br>
                <br></br>
              </>
            )}
        <br />
        <Link to={`create`}>Add Transactions</Link>
      </div>
    </>
  );
};
