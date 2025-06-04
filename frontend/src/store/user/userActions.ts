import { createAction } from "@reduxjs/toolkit";
import { User } from "../../types/carrierType";

export const setUser = createAction<User>("user/setUser");
export const clearUser = createAction("user/clearUser");
