import { carriers } from "../../constants/constants";
// import { RecentActivity, Tower } from "../../types/carrierType";

export const getCarrierDetails = (
  user: {
    username: string;
    password: string;
  } | null
) => {
  if (!user?.username || !user.password) return null;
  const { username } = user;
  const domain = username.split("@")[1];
  const carrierKey = domain.split(".")[0];
  return carriers[carrierKey];
};

export const formatCarrierData = (carrierList: any) => {
  let activeTowers = 0;
  let totalDevices = 0;
  let users = 0;
  let securityAlerts = 0;
  let towerStatuses: any = [];
  let recentActivity: any = [];

  carrierList.forEach((carrier: any) => {
    activeTowers += carrier.dashboard.activeTowers;
    totalDevices += carrier.dashboard.totalDevices;
    users += carrier.dashboard.users;
    securityAlerts += carrier.dashboard.securityAlerts;
    towerStatuses.push(...carrier.towers);
    recentActivity.push(...carrier.recentActivity);
  });

  return {
    activeTowers,
    totalDevices,
    users,
    securityAlerts,
    towerStatuses,
    recentActivity,
  };
};
