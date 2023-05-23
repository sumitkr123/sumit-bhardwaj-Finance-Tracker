import { TransactionTabHeaders, amountFormatter } from "../../utils/constants";

export const TableData = (props) => {
  const tcelldata = props.tcelldata;
  const headers = props.headers;

  return (
    <td className="td">
      {TransactionTabHeaders[headers].type === "amount" ? (
        amountFormatter(tcelldata)
      ) : TransactionTabHeaders[headers].type === "image" ? (
        <img src={tcelldata} className="receipt" alt="alt" />
      ) : (
        tcelldata
      )}
    </td>
  );
};
