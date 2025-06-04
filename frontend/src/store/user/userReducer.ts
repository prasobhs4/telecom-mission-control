import { createReducer, PayloadAction } from "@reduxjs/toolkit";
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

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      setUser,
      (
        state,
        action: PayloadAction<{ username: string; password: string; carrier: string }>
      ) => {
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.carrier = action.payload.carrier;
      }
    )
    .addCase(clearUser, (state) => {
      state.username = "";
      state.password = "";
      state.carrier = "";
    });
});

export default userReducer;
