import { useMemo, useState } from "react";

import { TransactionData } from "./components/transaction_data";

import "../../../assets/styles/transaction.css";
import { Link } from "react-router-dom";
import { groupby } from "../../../utils/constants";
import { ErrorPage } from "../../../components/errorpage";

import { Cookies } from "react-cookie";
import { useAppSelector } from "../../../redux/ducks/hooks";
import {
  Transaction,
  typeDefTransaction,
} from "../../../redux/ducks/transaction_slice";

type typeGroup = {
  [key: string]: Transaction[];
};

export const AllData = () => {
  const transactions = useAppSelector((state) => state.transactions);

  const [newtransactions, setNewTransactions] = useState<Transaction[]>([]);

  const [groupedData, setGroupedData] = useState<Transaction[]>([]);

  const [groupVal, setGroupVal] = useState("");

  const cookie = new Cookies();

  useMemo(() => {
    setNewTransactions(transactions);
  }, [transactions]);

  useMemo(() => {
    let temp = [...transactions];

    let result: any = {};

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
      <header className="header">
        <div className="container">
          <div className="headerdiv">
            <div className="groupdiv">
              <label>
                Group by :-
                <select
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
        </div>
      </header>

      <div className="sections">
        <section className="tabsection">
          {groupedData.length !== 0 && groupVal
            ? Object.keys(groupedData[0]).map(
                (value) =>
                  value && (
                    <div key={value} className="container">
                      <div className="wholeTabWithEverything">
                        <h1>{value}</h1>
                        <TransactionData transactions={groupedData[0][value]} />
                      </div>
                    </div>
                  )
              )
            : newtransactions.length !== 0 && (
                <div className="container">
                  <div className="wholeTabWithEverything">
                    <TransactionData transactions={newtransactions} />
                  </div>
                </div>
              )}
        </section>

        <section className="navSection">
          <div className="container">
            <Link to={`create`}>Add Transactions</Link>
          </div>
        </section>
      </div>
    </>
  );
};
