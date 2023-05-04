import { useEffect, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import "../../../App.css";
import "./css/transaction.css";
import { Link, useNavigate } from "react-router-dom";
import { groupby } from "../../../utils/constants";
import { getAllTransactions } from "../../../requests/requests";
import { ErrorPage } from "../../../components/errorpage";

export const AllData = () => {
  // eslint-disable-next-line
  const [initTransactions, setInitTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [groupedData, setGroupedData] = useState([]);

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    let auth_data = JSON.parse(localStorage.getItem("auth_token"));

    setUserData(auth_data);
  }, []);

  useEffect(() => {
    if (userData !== undefined && userData !== null) {
      if (
        localStorage.getItem(userData.email) !== null &&
        localStorage.getItem(userData.email) !== undefined
      ) {
        let existingData = getAllTransactions(userData.email);

        setTransactions(existingData);
        setInitTransactions(existingData);
      }
    }
  }, [userData]);

  const logout = () => {
    let logoutstatus = window.confirm("Are you sure you want to logout..!");
    if (logoutstatus) {
      localStorage.removeItem("auth_token");
      navigate("/login");
    }
  };

  function groupdata(event) {
    let temp = [...transactions];

    let result = {};

    if (event.target.value) {
      temp.forEach((item) => {
        const value = item[event.target.value];

        result[value] = result[value] ?? [];
        result[value].push(item);
      });
      setGroupedData([result]);
    } else {
      setGroupedData([]);
    }
  }

  if (transactions.length === 0) {
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
          : transactions.length !== 0 && (
              <>
                <TransactionData transactions={transactions} />
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
