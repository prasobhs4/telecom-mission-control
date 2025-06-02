export type Tower = {
  id: string;
  status: "ACTIVE" | "INACTIVE";
};

export type DashboardStats = {
  activeTowers: number;
  totalDevices: number;
  users: number;
  securityAlerts: number;
};

export type RecentActivity = {
  timestamp: string; // ISO datetime format
  message: string;
};

export type Carrier = {
  carrierName: string;
  email: string;
  towers: Tower[];
  dashboard: DashboardStats;
  recentActivity: RecentActivity[];
};

export type CarrierList = Carrier[];
