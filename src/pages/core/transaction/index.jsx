import { useEffect, useState } from "react";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TransactionTabHeaders } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { ErrorPage } from "../../../components/errorpage";
import { TableData } from "../../../components/table/tableData";

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
              {Object.keys(TransactionTabHeaders).map((headers, index) => (
                <TableData
                  key={headers + index + tdata.id}
                  tcelldata={tdata[headers]}
                  headers={headers}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/transactions`}>Go to home</Link>
    </div>
  );
};
