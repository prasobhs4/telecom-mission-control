export interface Tower {
  id: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface DashboardStats {
  activeTowers: number;
  totalDevices: number;
  users: number;
  securityAlerts: number;
}

export interface RecentActivity {
  timestamp: string; // ISO datetime format
  message: string;
}

export interface Carrier {
  carrierName: string;
  email: string;
  towers: Tower[];
  dashboard: DashboardStats;
  recentActivity: RecentActivity[];
}

export type CarrierList = Carrier[];

export interface User {
  username: string;
  password: string;
  carrier: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface TowerStatus {
  id: string;
  status: "ACTIVE" | "INACTIVE";
  towerType: string;
  location: Location;
  installDate: string;
  coverageRadius: number;
}

export interface Activity {
  timestamp: string;
  message: string;
  by: User;
}

export interface LogEntry {
  userId: string;
  action: string;
  timestamp: string;
}

export interface Device {
  ip: string;
  mac: string;
  vendor: string;
  model: string;
  carrier?: string;
  status?: string;
  user?: User;
}

export interface DeviceState {
  discovered: Device[];
  simulated: Device | null;
}

export interface PolicyState {
  applied: boolean;
  logs: LogEntry[];
}

export interface PolicyPayload {
  policyName: string;
  policyType: string;
  apply: Record<string, boolean>;
  user: string;
  carrier: string;
}

export interface TowerRegistrationData {
  id: string;
  location: string;
  towerType: string;
  installationDate: string;
  coverageRadius: string;
  carriers: string[];
  supportedOS: string[];
  user: User;
}

export interface Dashboard {
  activeTowers: number;
  totalDevices: number;
  users: number;
  securityAlerts: number;
  towerStatuses: TowerStatus[];
  recentActivity: Activity[];
}

export interface AppState {
  user: User;
  dashboard: Dashboard;
  towers: string[];
  policy: PolicyState;
}
