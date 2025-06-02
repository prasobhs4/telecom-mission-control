import { createReducer } from "@reduxjs/toolkit";
import { setUser, clearUser } from "./userActions";

interface UserState {
  username: string;
  password: string;
}

const initialState: UserState = {
  username: "",
  password: "",
};

const userReducer = createReducer(initialState, (builder: any) => {
  builder
    .addCase(setUser, (state: any, action: any) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    })
    .addCase(clearUser, (state: any) => {
      state.username = "";
      state.password = "";
    });
});

export default userReducer;
