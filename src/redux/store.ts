import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./ducks/users_slice";
import transactionReducer from "./ducks/transaction_slice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    users: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
