import { createReducer } from "@reduxjs/toolkit";
import { formatCarrierData } from "../../components/utils/util";
import { setDashboardData } from "./dashboardActions";

interface TowerStatus {
  id: string;
  status: "ACTIVE" | "INACTIVE";
}

interface Activity {
  timestamp: string;
  message: string;
}

interface DashboardState {
  activeTowers: number;
  totalDevices: number;
  users: number;
  securityAlerts: number;
  towerStatuses: TowerStatus[];
  recentActivity: Activity[];
}

const initialState: DashboardState = {
  activeTowers: 25,
  totalDevices: 150000,
  users: 90000,
  securityAlerts: 2,
  towerStatuses: [
    { id: "TWR123456", status: "ACTIVE" },
    { id: "TWR123457", status: "ACTIVE" },
    { id: "TWR123444", status: "ACTIVE" },
    { id: "TWR892828", status: "ACTIVE" },
    { id: "TWR788828", status: "ACTIVE" },
    { id: "TWR123338", status: "ACTIVE" },
  ],
  recentActivity: [
    { timestamp: "2025-06-01 10:30:00", message: "User Policy Updated" },
    {
      timestamp: "2025-05-30 11:02:59",
      message: "TWR892828 Security resolved",
    },
    { timestamp: "2025-05-29 21:34:18", message: "Security Alert - TWR892828" },
    { timestamp: "2025-05-27 07:55:30", message: "New Tower Registered" },
    {
      timestamp: "2025-05-22 18:47:03",
      message: "TWR186392 Security resolved",
    },
    { timestamp: "2025-05-22 09:10:12", message: "Security Alert - TWR186392" },
    { timestamp: "2025-05-07 14:23:45", message: "New Admin added" },
    { timestamp: "2025-05-01 08:19:07", message: "New Admin added" },
  ],
};

const dashboardReducer = createReducer(initialState, (builder) => {
  builder.addCase(setDashboardData, (state, action) => {
    const { data } = action.payload;
    return formatCarrierData(data);
  });
});

export default dashboardReducer;
