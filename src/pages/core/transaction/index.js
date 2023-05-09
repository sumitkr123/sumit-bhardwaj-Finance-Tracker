import { useEffect, useState } from "react";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { amountFormatter } from "../../../utils/constants";
import { useTransactions } from "../../../providers/transaction_provider";
import { getSingleTransaction } from "../../../requests/requests";

export const Transaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { transactions } = useTransactions();

  const [viewtransaction, setViewTransactions] = useState([]);

  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      let newdata = [];

      newdata = getSingleTransaction(transactions, id);

      setViewTransactions(newdata);
    } else {
      navigate("/*");
    }
  }, [id, transactions]);

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
          {viewtransaction.map((tdata) => (
            <tr className="contentrow" key={tdata.id}>
              <td className="td">{tdata.tdate}</td>
              <td className="td">{tdata.monthyear}</td>
              <td className="td">{tdata.ttype}</td>
              <td className="td">{tdata.FromAc}</td>
              <td className="td">{tdata.ToAc}</td>
              <td className="td">{amountFormatter(tdata.amount)}</td>

              <td className="td">
                {<img src={tdata.receipt} width={80} height={60} alt="alt" />}
              </td>

              <td className="td">{tdata.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/transactions`}>Go to home</Link>
    </div>
  );
};
