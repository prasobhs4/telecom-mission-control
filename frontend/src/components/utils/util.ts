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

export const getUser = (username: string) => username && username.split("@")[0];

export const getUserName = (
  user: {
    username: string;
    password: string;
  } | null
) => {
  if (!user?.username || !user.password) return null;
  const { username } = user;
  const userName = getUser(username);
  return userName;
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

const generateRandomIP = () => {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
};

const generateRandomMAC = () => {
  const hex = "0123456789ABCDEF";
  let mac = "";
  for (let i = 0; i < 6; i++) {
    mac += hex[Math.floor(Math.random() * 16)];
    mac += hex[Math.floor(Math.random() * 16)];
    if (i !== 5) mac += "-";
  }
  return mac;
};

const getRandomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const generateRandomDevice = () => ({
  ip: generateRandomIP(),
  mac: generateRandomMAC(),
  vendor: getRandomItem(["Cisco", "Juniper", "Nokia", "Ericsson", "Huawei"]),
  model: getRandomItem(["X100", "NX9000", "E77", "Raptor5", "Titan"]),
});
