import { useEffect, useState } from "react";

import logo from "../../logo.svg";
import "../../App.css";
import "../../pages/all_transactions/css/transaction.css";
import { Link, useParams } from "react-router-dom";

export const Transaction = () => {
  const { id } = useParams();

  const [transaction, setTransactions] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("userdata") !== null &&
      localStorage.getItem("userdata") !== undefined
    ) {
      let existingData = JSON.parse(localStorage.getItem("userdata"));

      let data = [];
      for (let i in existingData) {
        if (parseInt(existingData[i].id) === parseInt(id)) {
          data.push(existingData[i]);
          break;
        }
      }

      setTransactions(data);
    }
  }, [id]);

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
          </tr>
        </thead>
        <tbody className="tabcontent">
          {transaction.map((tdata) => (
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
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/`}>Go to Home</Link>
    </div>
  );
};
