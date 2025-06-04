import { createAction } from "@reduxjs/toolkit";
import { CarrierList } from "../../types/carrierType";

export const setDashboardData = createAction<CarrierList>(
  "dashboard/setDashboardData"
);
