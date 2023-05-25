import { combineReducers } from "redux";
import userReducer from "./ducks/users_slice";
import transactionReducer from "./ducks/transaction_slice";

export const rootReducer = combineReducers({
  transactions: transactionReducer,
  users: userReducer,
});
