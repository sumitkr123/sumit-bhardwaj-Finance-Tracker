import { Link } from "react-router-dom";
import { Pagination } from "./pagination";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  fixedimit,
  month,
  paginno,
  amountFormatter,
  fixedShowPageCount,
  TransactionTabHeaders,
} from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../../redux/ducks/transaction_slice";
import { TableHeader } from "./tableHeader";

export const TransactionData = (props) => {
  //Getting Data From Main component and doing sorting and pagination and searching here..!

  const [newData, setNewData] = useState(props.transactions);

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });

  const [pagination, setPagination] = useState({
    showPage: fixedShowPageCount,
    totalpage: 0,
    limit: fixedimit,
    pageno: 1,
    pages: [],
  });

  const searchRef = useRef("");

  const dispatch = useDispatch();

  useEffect(() => {
    let newtransactiondata = [...props.transactions];
    setNewData(newtransactiondata);
  }, [props.transactions]);

  useMemo(() => {
    let totpage = Math.ceil(newData.length / pagination.limit);

    let pagelist = [];

    for (let i = 1; i <= totpage; i++) {
      pagelist.push(i);
    }

    setPagination({
      ...pagination,
      pageno: 1,
      totalpage: totpage,
      pages: pagelist,
    });

    // eslint-disable-next-line
  }, [newData, pagination.limit]);

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

  function changePageRecCounts(counts) {
    let rec = parseInt(counts);

    if (rec >= paginno[0]) {
      setPagination({
        ...pagination,
        pageno: 1,
        limit: rec,
      });
    } else {
      setPagination({
        ...pagination,
        pageno: 1,
        limit: fixedimit,
      });
    }
  }

  function searchData(event) {
    let temp = [...props.transactions];

    let searchvalue = event.target.value;

    if (
      searchvalue !== null &&
      searchvalue !== undefined &&
      searchvalue !== ""
    ) {
      let abc = temp.filter((mainitem) =>
        Object.keys(mainitem).some((column) => {
          if (
            column !== "receipt" &&
            column !== "id" &&
            mainitem[column]
              .toString()
              .toLowerCase()
              .includes(searchvalue.trim().toLowerCase())
          ) {
            return mainitem;
          }
        })
      );

      setNewData(abc);
    } else {
      setNewData(props.transactions);
    }
  }

  const dataWithSerialNo = useMemo(() => {
    return [...newData].map((item, index) => {
      let newItem = { ...item };
      newItem.serialNo = index + 1;
      return newItem;
    });
  }, [newData]);

  const firstVal = useMemo(() => {
    return (
      dataWithSerialNo[0] &&
      dataWithSerialNo
        .slice(
          (pagination.pageno - 1) * pagination.limit,
          pagination.pageno * pagination.limit
        )
        .at(0).serialNo
    );
  }, [pagination]);

  const secondVal = useMemo(() => {
    return [...dataWithSerialNo].slice(0, pagination.pageno * pagination.limit)
      .length;
  }, [pagination]);

  const thirdVal = useMemo(() => {
    return dataWithSerialNo.length;
  }, [dataWithSerialNo]);

  const deleteRecord = (id) => {
    let deleteStatus = window.confirm(
      "Are you sure you want to delete this Record..!"
    );
    if (deleteStatus) {
      dispatch(deleteTransaction(id));
    }
  };

  return (
    <>
      <div className="searchdiv">
        <label>
          Search :-
          <input
            type="text"
            ref={searchRef}
            name="search"
            onChange={(e) => searchData(e)}
          />
        </label>
      </div>

      {searchRef.current.value && newData.length === 0 ? (
        <div className="searchNotFound">
          <h2>Oops..! no search results found..!</h2>
        </div>
      ) : (
        newData.length !== 0 && (
          <>
            <div className="makeDivHoriZontalScroll">
              <table className="table">
                <thead className="header">
                  <tr className="headerrow">
                    {Object.keys(TransactionTabHeaders).map((keyCol) => {
                      return TransactionTabHeaders[keyCol].isSortable ===
                        true ? (
                        <TableHeader
                          key={keyCol}
                          tabHeader={TransactionTabHeaders[keyCol].name}
                          col={keyCol}
                          sorting={sorting}
                          setSortingColumn={setSortingColumn}
                          type={TransactionTabHeaders[keyCol].type}
                          newData={newData}
                        />
                      ) : (
                        <th className="th" key={keyCol}>
                          {TransactionTabHeaders[keyCol].name}
                        </th>
                      );
                    })}

                    <th className="th" colSpan={3}>
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
                              className="receipt"
                              alt="alt"
                            />
                          }
                        </td>

                        <td className="td">{tdata.notes}</td>
                        <td className="td">
                          <Link to={`${tdata.id}`}>View</Link>
                        </td>
                        <td className="td">
                          <Link to={`edit/${tdata.id}`}>Edit</Link>
                        </td>
                        <td className="td">
                          <i
                            className="fa fa-trash"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteRecord(tdata.id)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="bottomPartOfTab makeDivHoriZontalScroll">
              {firstVal && secondVal && thirdVal && (
                <p>
                  Showing &nbsp;
                  {firstVal}
                  &nbsp; to &nbsp;
                  {secondVal}
                  &nbsp; of {thirdVal} entries
                </p>
              )}

              <Pagination
                pagination={pagination}
                changepageno={(pageno) => {
                  setPagination({
                    ...pagination,
                    pageno: pageno,
                  });
                }}
              />
            </div>

            <div className="pagindiv">
              <label>
                Show &nbsp;
                <select
                  type="text"
                  name="group"
                  style={{ width: "50px" }}
                  defaultValue={pagination.limit}
                  onChange={(e) => changePageRecCounts(e.target.value)}
                >
                  {paginno.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                &nbsp; entries
              </label>
            </div>
          </>
        )
      )}
    </>
  );
};
