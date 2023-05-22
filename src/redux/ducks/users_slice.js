import { createSlice } from "@reduxjs/toolkit";
import { defaultUsers } from "../../utils/constants";

const initialState = defaultUsers;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const data = action.payload;

      let user_data = {};
      let newdata = [...state];

      if (newdata) {
        user_data["id"] = state[state.length - 1].id + 1;
        user_data["name"] = data.name;
        user_data["phone"] = data.phone;
        user_data["email"] = data.email;
        user_data["pass"] = data.password;

        newdata.push(user_data);

        return newdata;
      } else {
        user_data["id"] = 1;
        user_data["name"] = data.name;
        user_data["phone"] = data.phone;
        user_data["email"] = data.email;
        user_data["pass"] = data.password;

        return [newdata];
      }
    },
  },
});

export const { actions, reducer } = userSlice;

export const { addUser } = actions;

export default reducer;
