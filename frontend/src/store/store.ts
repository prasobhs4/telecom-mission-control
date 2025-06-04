import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import dashboardReducer from "./dashboard/dashboardReducer";
import towerReducer from "./towers/towerReducer";
import deviceReducer from "./device/deviceReducer";
import policyReducer from "./policy/policyReducer";
import logReducer from "./userlogs/logReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    towers: towerReducer,
    device: deviceReducer,
    policy: policyReducer,
    logs: logReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
