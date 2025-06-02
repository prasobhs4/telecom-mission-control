import { createAction } from "@reduxjs/toolkit";

export const setUser = createAction<{ username: string; password: string }>(
  "user/setUser"
);
export const clearUser = createAction("user/clearUser");
