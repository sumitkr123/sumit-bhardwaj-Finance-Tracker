import { TransactionTabHeaders } from "../../models/exports";
import { amountFormatter } from "./currency";

export const TableData = (props: {
  tcelldata: string;
  headers: string;
}): React.JSX.Element => {
  const tcelldata = props.tcelldata;
  const headers = props.headers;

  return (
    <td className="td">
      {TransactionTabHeaders[headers].type === "amount" ? (
        amountFormatter(tcelldata, "rupee")
      ) : TransactionTabHeaders[headers].type === "image" ? (
        <img src={tcelldata} className="receipt" alt="alt" />
      ) : (
        tcelldata
      )}
    </td>
  );
};
