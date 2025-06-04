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

type User = {
  username: string;
  password: string;
  carrier: string;
};

type Location = {
  latitude: number;
  longitude: number;
};

type TowerStatus = {
  id: string;
  status: string;
  towerType: string;
  location: Location;
  installDate: string;
  coverageRadius: number;
};

type Activity = {
  timestamp: string;
  message: string;
  by: User;
};

type Device = {
  discovered: any[]; // You can replace `any` with a proper type if known
  simulated: any | null; // Replace `any` with actual simulated device type if defined
};

type Policy = {
  applied: boolean;
  logs: any[]; // Replace with specific log type if available
};

type Dashboard = {
  activeTowers: number;
  totalDevices: number;
  users: number;
  securityAlerts: number;
  towerStatuses: TowerStatus[];
  recentActivity: Activity[];
};

export type AppState = {
  user: User;
  dashboard: Dashboard;
  towers: any[];
  policy: Policy;
};
