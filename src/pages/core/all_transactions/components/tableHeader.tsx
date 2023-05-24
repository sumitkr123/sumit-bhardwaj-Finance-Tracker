export const TableHeader = (props: any): React.JSX.Element => {
  const tabHeader = props.tabHeader;
  const col = props.col;
  const sorting = props.sorting;
  const type = props.type;
  const newData = props.newData;
  const setSortingColumn = props.setSortingColumn;

  return (
    <th
      className="th"
      onClick={() => (newData.length <= 1 ? null : setSortingColumn(col, type))}
    >
      <div className="sortHeader">
        <span>{tabHeader}</span>
        <span>
          {sorting.sortingOrder === "asc" &&
          sorting.sortingColumnName === col ? (
            <i className="fa-solid fa-caret-up"></i>
          ) : sorting.sortingOrder === "desc" &&
            sorting.sortingColumnName === col ? (
            <i className="fa-solid fa-caret-down"></i>
          ) : (
            <>
              <i className="fa-solid fa-caret-up"></i>
              <br />
              <i className="fa-solid fa-caret-down"></i>
            </>
          )}
        </span>
      </div>
    </th>
  );
};
