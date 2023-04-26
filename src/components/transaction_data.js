import { Link } from "react-router-dom";

export const TransactionData = (props) => {
  const transaction = props.transaction;
  const index = props.index;

  return (
    <tr className="contentrow">
      <td className="td">{transaction.tdate}</td>
      <td className="td">{transaction.monthyear}</td>
      <td className="td">{transaction.ttype}</td>
      <td className="td">{transaction.FromAc}</td>
      <td className="td">{transaction.ToAc}</td>
      <td className="td">{transaction.amount}</td>

      <td className="td">
        {
          // eslint-disable-next-line
          <img
            src={transaction.receipt}
            width={80}
            height={60}
            alt="receiptimage"
          />
        }
      </td>

      <td className="td">{transaction.notes}</td>
      <td className="td">
        <Link to={`/transactions/${index}`}>View</Link>
      </td>
    </tr>
  );
};
