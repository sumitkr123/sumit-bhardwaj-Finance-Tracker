import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  EditTransactionPayloadType,
  Transaction,
} from "../../models/transactionModel";
import { defaultTransactions } from "../../utils/constants";

const initialState: Transaction[] = defaultTransactions;

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      if (state.length !== 0 && state.length !== undefined) {
        let newdata = [...state];

        let previd = newdata[newdata.length - 1].id;

        let pushData = action.payload;
        pushData["id"] = previd && previd + 1;

        newdata.push(pushData);

        return newdata;
      } else {
        let newdata = [...state];

        let pushData = action.payload;
        pushData["id"] = 1;
        newdata.push(pushData);

        return newdata;
      }
    },
    editTransaction: (
      state,
      action: PayloadAction<EditTransactionPayloadType>
    ) => {
      const editid = action.payload.id;

      let newdata = [...state];

      return newdata.map((item: Transaction) =>
        item.id === editid ? (item = action.payload.edit) : item
      );
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      const delId = action.payload;

      let newdata = [...state];

      return newdata.filter((item: Transaction) => item.id !== delId);
    },
  },
});

const { actions, reducer } = transactionSlice;

export const { addTransaction, editTransaction, deleteTransaction } = actions;

export default reducer;
