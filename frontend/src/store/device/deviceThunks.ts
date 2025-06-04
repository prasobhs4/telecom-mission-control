import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setDiscoveredDevices, setSimulatedDevice } from "./deviceActions";
import { Device } from "../../types/carrierType";
import { AppDispatch } from "../store";

export const fetchDevices = () => async (dispatch: AppDispatch) => {
  const res = await axios.get<Device[]>(`${API_BASE}/device-discovery`);
  dispatch(setDiscoveredDevices(res.data));
};

export const simulateDevice = (device: Device) => async (
  dispatch: AppDispatch
) => {
  await axios.post(`${API_BASE}/simulate-device`, device);
  dispatch(setSimulatedDevice(device));
};
