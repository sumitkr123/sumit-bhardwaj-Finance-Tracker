import { Link } from "react-router-dom";
import { Pagination } from "./pagination";
import { useEffect, useMemo, useState } from "react";
import {
  fixedimit,
  month,
  paginno,
  fixedShowPageCount,
} from "../../../../utils/constants";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../../../redux/ducks/transaction_slice";
import { TableHeader } from "./tableHeader";
import { TableData } from "../../../../components/table/tableData";
import {
  Transaction,
  TransactionTabHeaders,
} from "../../../../models/transactionModel";

export type typePagination = {
  showPage: number;
  totalpage: number;
  limit: number;
  pageno: number;
  pages: number[];
};

type typeTransaction = {
  transactions: Transaction[];
};

export const TransactionData = (props: typeTransaction): React.JSX.Element => {
  //Getting Data From Main component and doing sorting and pagination and searching here..!

  const [newData, setNewData] = useState(props.transactions);

  const [sorting, setSorting] = useState({
    sortingColumnName: "",
    sortingOrder: "",
    columnValueType: "",
  });

  const [pagination, setPagination] = useState<typePagination>({
    showPage: fixedShowPageCount,
    totalpage: 0,
    limit: fixedimit,
    pageno: 1,
    pages: [],
  });

  const [searchValue, setSearchValue] = useState<string>("");

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

  const doSort = (getAllTransactions: Transaction[]) => {
    getAllTransactions.sort((a, b) => {
      switch (sorting.columnValueType) {
        case "number":
          return sorting.sortingOrder === "asc"
            ? parseInt(a[sorting.sortingColumnName]) >
              parseInt(b[sorting.sortingColumnName])
              ? 1
              : -1
            : parseInt(a[sorting.sortingColumnName]) <
              parseInt(b[sorting.sortingColumnName])
            ? 1
            : -1;

        case "monthyear":
          let fmonth = a[sorting.sortingColumnName].split(" ")[0];
          let smonth = b[sorting.sortingColumnName].split(" ")[0];

          let fyear = parseInt(a[sorting.sortingColumnName].split(" ")[1]);
          let syear = parseInt(b[sorting.sortingColumnName].split(" ")[1]);

          return sorting.sortingOrder === "asc"
            ? month.indexOf(fmonth) > month.indexOf(smonth) && fyear >= syear
              ? 1
              : -1
            : month.indexOf(fmonth) < month.indexOf(smonth) && fyear <= syear
            ? 1
            : -1;

        case "date":
          let fdate = new Date(a[sorting.sortingColumnName]);
          let sdate = new Date(b[sorting.sortingColumnName]);

          return sorting.sortingOrder === "asc"
            ? fdate > sdate
              ? 1
              : -1
            : fdate < sdate
            ? 1
            : -1;

        default:
          return sorting.sortingOrder === "asc"
            ? a[sorting.sortingColumnName] > b[sorting.sortingColumnName]
              ? 1
              : -1
            : a[sorting.sortingColumnName] < b[sorting.sortingColumnName]
            ? 1
            : -1;
      }
    });
  };

  useEffect(() => {
    let getAllTransactions = [...newData];

    switch (sorting.sortingOrder) {
      case "asc":
        doSort(getAllTransactions);
        break;

      case "desc":
        doSort(getAllTransactions);
        break;

      default:
        getAllTransactions = props.transactions;
        break;
    }

    setNewData(getAllTransactions);
    // eslint-disable-next-line
  }, [sorting]);

  const setSortingColumn = (column: string, type: string) => {
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
  };

  const changePageRecCounts = (counts: string) => {
    setPagination({
      ...pagination,
      pageno: 1,
      limit: parseInt(counts) || fixedimit,
    });
  };

  const searchData = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp = [...props.transactions];

    let searchvalue = event.target.value;
    setSearchValue(searchvalue);

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
  };

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
      dataWithSerialNo.slice(
        (pagination.pageno - 1) * pagination.limit,
        pagination.pageno * pagination.limit
      )[0].serialNo
    );
  }, [pagination]);

  const secondVal = useMemo(() => {
    return [...dataWithSerialNo].slice(0, pagination.pageno * pagination.limit)
      .length;
  }, [pagination]);

  const thirdVal = useMemo(() => {
    return dataWithSerialNo.length;
  }, [dataWithSerialNo]);

  const deleteRecord = (id: number) => {
    let deleteStatus = window.confirm(
      "Are you sure you want to delete this Record..!"
    );
    if (deleteStatus) {
      dispatch(deleteTransaction(id));
    }
  };

  const filteredBlock = useMemo(() => {
    return (
      searchValue && (
        <span>
          (filtered from &nbsp;{props.transactions.length}&nbsp; total entries)
        </span>
      )
    );
  }, [searchValue]);

  return (
    <>
      <div className="searchdiv">
        <label>
          Search :-
          <input type="text" name="search" onChange={(e) => searchData(e)} />
        </label>
      </div>

      {searchValue && newData.length === 0 ? (
        <div className="searchNotFound">
          <h2>Oops..! no search results found..!</h2>
          {filteredBlock}
        </div>
      ) : (
        newData.length !== 0 && (
          <>
            <div className="makeDivHoriZontalScroll">
              <table className="table">
                <thead className="header">
                  <tr className="headerrow">
                    {Object.keys(TransactionTabHeaders).map((keyCol) =>
                      TransactionTabHeaders[keyCol].isSortable === true ? (
                        <TableHeader
                          key={keyCol}
                          tabHeader={TransactionTabHeaders[keyCol].name}
                          col={keyCol}
                          sorting={sorting}
                          setSortingColumn={setSortingColumn}
                          type={TransactionTabHeaders[keyCol].sortType}
                          newData={newData}
                        />
                      ) : (
                        <th className="th" key={keyCol}>
                          {TransactionTabHeaders[keyCol].name}
                        </th>
                      )
                    )}

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
                    .map((tdata: Transaction) => (
                      <tr className="contentrow" key={tdata.id}>
                        {Object.keys(TransactionTabHeaders).map(
                          (headers, index) => (
                            <TableData
                              key={headers + index + tdata.id}
                              tcelldata={tdata[headers]}
                              headers={headers}
                            />
                          )
                        )}

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
                            onClick={() => deleteRecord(tdata.id!)}
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

              {filteredBlock}

              <Pagination
                pagination={pagination}
                changepageno={(pageno: number) => {
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
