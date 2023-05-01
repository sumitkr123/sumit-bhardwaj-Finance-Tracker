import { useEffect, useState } from "react";

import "../../App.css";
import "../../pages/all_transactions/css/transaction.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Transaction = () => {
  console.log("aavyu...!");
  const { id } = useParams();
  const navigate = useNavigate();

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

      if (data.length !== 0) {
        setTransactions(data);
      } else {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, []);

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
                {<img src={tdata.receipt} width={80} height={60} alt="alt" />}
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
