import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import dashboardReducer from "./dashboard/dashboardReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
