import { createAction } from "@reduxjs/toolkit";
import { Device } from "../../types/carrierType";

export const setDiscoveredDevices = createAction<Device[]>(
  "device/setDiscoveredDevices"
);
export const setSimulatedDevice = createAction<Device>(
  "device/setSimulatedDevice"
);
