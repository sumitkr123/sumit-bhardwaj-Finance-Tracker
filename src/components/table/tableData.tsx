import { TransactionTabHeaders, amountFormatter } from "../../utils/constants";

export const TableData = (props: any): React.JSX.Element => {
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
