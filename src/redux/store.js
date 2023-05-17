import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./ducks/transaction_slice";
import userReducer from "./ducks/users_slice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    users: userReducer,
  },
});
