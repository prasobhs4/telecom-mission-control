import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser } from "./userActions";

interface UserState {
  username: string;
  password: string;
  carrier: string;
}

const initialState: UserState = {
  username: "",
  password: "",
  carrier: "",
};

const userReducer = createReducer(initialState, (builder: any) => {
  builder
    .addCase(setUser, (state: any, action: any) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.carrier = action.payload.carrier;
    })
    .addCase(clearUser, (state: any) => {
      state.username = "";
      state.password = "";
      state.carrier = "";
    });
});

export default userReducer;
