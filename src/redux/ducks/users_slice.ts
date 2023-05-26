import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/userModel";
import { defaultUsers } from "../../utils/constants";

const initialState: User[] = defaultUsers;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const data = action.payload;

      let newdata = [...state];

      if (state.length !== 0 && state.length !== undefined) {
        data["id"] = state[state.length - 1].id! + 1;

        newdata.push(data);

        return newdata;
      } else {
        data["id"] = 1;

        newdata.push(data);

        return newdata;
      }
    },
  },
});

export const { actions, reducer } = userSlice;

export const { addUser } = actions;

export default reducer;
