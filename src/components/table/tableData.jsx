import { TransactionTabHeaders, amountFormatter } from "../../utils/constants";

export const TableData = (props) => {
  const tdata = props.tdata;
  const headers = props.headers;

  return (
    <td className="td">
      {TransactionTabHeaders[headers].type === "amount" ? (
        amountFormatter(tdata[headers])
      ) : TransactionTabHeaders[headers].type === "image" ? (
        <img src={tdata[headers]} className="receipt" alt="alt" />
      ) : (
        tdata[headers]
      )}
    </td>
  );
};
