import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { setUser, clearUser } from "./userActions";
import { User } from "../../types/carrierType";

type UserState = User;

const initialState: UserState = {
  username: "",
  password: "",
  carrier: "",
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.carrier = action.payload.carrier;
    })
    .addCase(clearUser, (state) => {
      state.username = "";
      state.password = "";
      state.carrier = "";
    });
});

export default userReducer;
