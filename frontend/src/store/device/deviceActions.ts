import { createAction } from "@reduxjs/toolkit";

export const setDiscoveredDevices = createAction<any[]>("device/setDiscoveredDevices");
export const setSimulatedDevice = createAction<any>("device/setSimulatedDevice");
