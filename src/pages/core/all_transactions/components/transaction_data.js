import { Link } from "react-router-dom";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";

export const TransactionData = (props) => {
  const month = props.month;
  const fixedimit = props.fixedimit;
  const amountFormatter = props.amountFormatter;

  //Getting Data From Main component and doing sorting and pagination here..!

  const [newData, setNewData] = useState(props.transactions);

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });

  const [pagination, setPagination] = useState({
    showPage: 5,
    totalpage: 0,
    limit: fixedimit,
    pageno: 1,
    pages: [],
  });

  useEffect(()=>{
    setNewData(props.transactions)
  },[props.transactions])

  useEffect(() => {
    let totpage = Math.ceil(newData.length / fixedimit);

    let pagelist = [];

    for (let i = 1; i <= totpage; i++) {
      pagelist.push(i);
    }

    setPagination({
      ...pagination,
      totalpage: totpage,
      pages: pagelist,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let getAllTransactions = [...newData];

    if (sorting.sortingOrder === "asc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) >
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          let fmonth = a[sorting.sortingColumnName].split(" ")[0];
          let smonth = b[sorting.sortingColumnName].split(" ")[0];

          let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
          let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

          if (month.indexOf(fmonth) > month.indexOf(smonth) && fyear >= syear) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate > sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] > b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
    if (sorting.sortingOrder === "desc") {
      getAllTransactions.sort((a, b) => {
        if (sorting.columnValueType === "number") {
          if (
            parseInt(a[sorting.sortingColumnName]) <
            parseInt(b[sorting.sortingColumnName])
          ) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "monthyear") {
          let fmonth = a[sorting.sortingColumnName].split(" ")[0];
          let smonth = b[sorting.sortingColumnName].split(" ")[0];

          let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
          let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

          if (month.indexOf(fmonth) < month.indexOf(smonth) && fyear <= syear) {
            return 1;
          } else {
            return -1;
          }
        } else if (sorting.columnValueType === "date") {
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          if (fdate < sdate) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[sorting.sortingColumnName] < b[sorting.sortingColumnName]) {
            return 1;
          } else {
            return -1;
          }
        }
      });
    }
    if (sorting.sortingOrder === "") {
      getAllTransactions = props.transactions;
    }

    setNewData(getAllTransactions);

    // eslint-disable-next-line
  }, [sorting]);

  function setSortingColumn(column, type) {
    let a = "";
    if (sorting.sortingColumnName === column) {
      switch (sorting.sortingOrder) {
        case "":
          a = "asc";
          break;
        case "asc":
          a = "desc";
          break;
        default:
          a = "";
          break;
      }
    } else {
      a = "asc";
    }

    setSorting({
      ...sorting,
      sortingOrder: a,
      sortingColumnName: column,
      columnValueType: type,
    });

    setPagination({
      ...pagination,
      pageno: 1,
    });
  }

  function changepageno(pageno) {
    setPagination({
      ...pagination,
      pageno: pageno,
    });
  }

  {
    console.log(newData, "sduifhasidjfnk");
  }

  return (
    <>
      <table className="table">
        <thead className="header">
          <tr className="headerrow">
            <th
              className="th"
              onClick={() =>
                newData.length <= 1 ? null : setSortingColumn("tdate", "date")
              }
            >
              Transaction-Date
            </th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1
                  ? null
                  : setSortingColumn("monthyear", "monthyear")
              }
            >
              Month-Year
            </th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1 ? null : setSortingColumn("ttype")
              }
            >
              Transaction-Type
            </th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1 ? null : setSortingColumn("FromAc")
              }
            >
              From-A/c
            </th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1 ? null : setSortingColumn("ToAc")
              }
            >
              To-A/c
            </th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1
                  ? null
                  : setSortingColumn("amount", "number")
              }
            >
              Amount
            </th>
            <th className="th">Receipt</th>
            <th
              className="th"
              onClick={() =>
                newData.length <= 1 ? null : setSortingColumn("notes")
              }
            >
              Notes
            </th>
            <th className="th" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="tabcontent">
          {newData
            .slice(
              (pagination.pageno - 1) * pagination.limit,
              pagination.pageno * pagination.limit
            )
            .map((tdata) => (
              <>
                {console.log('tdata',tdata)}
                <tr className="contentrow" key={tdata.id}>
                  <td className="td">{tdata.tdate}</td>
                  <td className="td">{tdata.monthyear}</td>
                  <td className="td">{tdata.ttype}</td>
                  <td className="td">{tdata.FromAc}</td>
                  <td className="td">{tdata.ToAc}</td>
                  <td className="td">{amountFormatter(tdata.amount)}</td>

                  <td className="td">
                    {
                      <img
                        src={tdata.receipt}
                        width={80}
                        height={60}
                        alt="alt"
                      />
                    }
                  </td>

                  <td className="td">{tdata.notes}</td>
                  <td className="td">
                    <Link to={`/view/${tdata.id}`}>View</Link>
                  </td>
                  <td className="td">
                    <Link to={`/edit/${tdata.id}`}>Edit</Link>
                  </td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      <Pagination pagination={pagination} changepageno={changepageno} />
    </>
  );
};
