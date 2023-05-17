export const TableHeader = (props) => {
  const tabHeader = props.tabHeader;
  const col = props.col;
  const sorting = props.sorting;

  return (
    <div className="sortHeader">
      <span>{tabHeader}</span>
      <span>
        {sorting.sortingOrder === "asc" && sorting.sortingColumnName === col ? (
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
  );
};
