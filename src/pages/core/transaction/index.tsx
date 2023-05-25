import React, { useEffect, useState } from "react";

import "../../../assets/styles/transaction.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ErrorPage } from "../../../components/errorpage/errorPage";
import { TableData } from "../../../components/table/tableData";
import { useAppSelector } from "../../../redux/hooks";
import {
  Transaction,
  TransactionTabHeaders,
} from "../../../models/transactionModel";
import { RootState } from "../../../redux/store";

export const ViewTransaction = (): React.JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const transactions = useAppSelector<Transaction[]>(
    (state: RootState) => state.transactions
  );

  const [viewtransaction, setViewTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      let newdata: Transaction[] = [];

      newdata = transactions.filter(
        (item: Transaction) => item.id === parseInt(id)
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
            {Object.keys(TransactionTabHeaders).map((keyCol: string) => {
              return (
                <th className="th" key={keyCol}>
                  {TransactionTabHeaders[keyCol].name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="tabcontent">
          {viewtransaction.map((tdata: Transaction) => (
            <tr className="contentrow" key={tdata.id}>
              {Object.keys(TransactionTabHeaders).map(
                (headers: string, index: number) => (
                  <TableData
                    key={headers + index + tdata.id}
                    tcelldata={tdata[headers]}
                    headers={headers}
                  />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/transactions`}>Go to home</Link>
    </div>
  );
};
