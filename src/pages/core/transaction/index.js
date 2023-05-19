import { useEffect, useState } from "react";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  TransactionTabHeaders,
  amountFormatter,
} from "../../../utils/constants";
import { useSelector } from "react-redux";
import { ErrorPage } from "../../../components/errorpage";

export const Transaction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactions = useSelector((state) => state.transactions);

  const [viewtransaction, setViewTransactions] = useState([]);

  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      let newdata = [];

      newdata = transactions.filter(
        (item) => parseInt(item.id) === parseInt(id)
      );

      setViewTransactions(newdata);
    } else {
      navigate("/*");
    }
  }, [id, transactions]);

  if (viewtransaction.length === 0) {
    return (
      <ErrorPage
        errorTitle={"Oops Data Not Found..!"}
        errorSubTitle={"Go Add Some Data..!"}
        redirect={"/transactions/create"}
      />
    );
  }

  return (
    <div className="container">
      <table className="table">
        <thead className="header">
          <tr className="headerrow">
            {Object.keys(TransactionTabHeaders).map((keyCol) => {
              return (
                <th className="th" key={keyCol}>
                  {TransactionTabHeaders[keyCol].name}
                </th>
              );
            })}
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
