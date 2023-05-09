import { useContext, useState } from "react";
import { TransactionContext } from "../contexts/transactioncontext";
import { defaultTransactions } from "../utils/constants";

export const useTransactions = () => {
  return useContext(TransactionContext);
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  return (
    <TransactionContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
};
