import { useEffect, useState } from "react";

import logo from "../../logo.svg";
import "../../App.css";
import "../../pages/all_transactions/css/transaction.css";
import { Link, useParams } from "react-router-dom";
import { TransactionData } from "../../components/transaction_data";

export const Transaction = () => {
  const { id } = useParams();

  const [transaction, setTransactions] = useState([]);

  useEffect(() => {
    console.log("useeffect called..");

    if (
      localStorage.getItem("userdata") !== null &&
      localStorage.getItem("userdata") !== undefined
    ) {
      let existingData = JSON.parse(localStorage.getItem("userdata"));

      setTransactions([existingData[id]]);
    }
  }, [id]);

  console.log("transaction index called");
  console.log(transaction);

  if (transaction.length === 0) {
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
          {transaction.map((tdata, index) => (
            <TransactionData transaction={tdata} key={index} index={index} />
          ))}
        </tbody>
      </table>
      <Link to={`/`}>Go to Home</Link>
    </div>
  );
};
