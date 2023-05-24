import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/userModel";

const defaultUsers = [
  {
    id: 1,
    name: "Sumit Bhardwaj",
    phone: "1234567890",
    email: "ak@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 2,
    name: "Akash Bhardwaj",
    phone: "1234567891",
    email: "aks@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 3,
    name: "Amit Bhardwaj",
    phone: "8796451223",
    email: "amit@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 4,
    name: "Akshal",
    phone: "8796451223",
    email: "akb85308@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 5,
    name: "Narendra Singh",
    phone: "1234567890",
    email: "sk@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 6,
    name: "Sam Kumar",
    phone: "8796451222",
    email: "sam@gmail.com",
    pass: "Ak@123456",
  },
  {
    id: 7,
    name: "Samir Kumar",
    phone: "8796451230",
    email: "samir@gmail.com",
    pass: "Ak@123456",
  },
];

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
