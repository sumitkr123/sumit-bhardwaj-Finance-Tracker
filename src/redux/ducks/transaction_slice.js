import { createSlice } from "@reduxjs/toolkit";
import { defaultTransactions } from "../../utils/constants";

const initialState = defaultTransactions;

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      if (state.length !== 0 && state.length !== undefined) {
        let previd = state.at(state.length - 1).id;

        let pushData = action.payload;
        pushData["id"] = previd + 1;

        let newdata = [...state];

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
    editTransaction: (state, action) => {
      const editid = parseInt(action.payload.id);

      let newdata = [...state];

      return newdata.map((item) =>
        parseInt(item.id) === parseInt(editid)
          ? (item = action.payload.edit)
          : item
      );
    },
    deleteTransaction: (state, action) => {
      const delId = action.payload;

      let newdata = [...state];

      return newdata.filter((item) => parseInt(item.id) !== parseInt(delId));
    },
  },
});

const { actions, reducer } = transactionSlice;

export const { addTransaction, editTransaction, deleteTransaction } = actions;

export default reducer;
