export const getSingleTransaction = (transactions, id) => {
  return transactions.filter((item) => parseInt(item.id) === parseInt(id));
};

export const saveData = (
  transactions,
  setTransactions,
  type,
  allvalues,
  id
) => {
  if (type === "first") {
    let pushData = [allvalues];
    pushData[0]["id"] = 1;

    setTransactions(pushData);
  } else {
    if (id !== null && id !== undefined && id !== "") {
      const editid = parseInt(id);

      for (let i in transactions) {
        if (parseInt(transactions[i].id) === editid) {
          transactions[i] = allvalues;
          break;
        }
      }
    } else {
      let previd = transactions.at(transactions.length - 1).id;

      let pushData = allvalues;
      pushData["id"] = previd + 1;

      transactions.push(pushData);
    }

    setTransactions(transactions);
  }
};
