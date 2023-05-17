import { createContext } from "react";

export const TransactionContext = createContext({
  transactions: null,
  setTransactions: () => {},
});
