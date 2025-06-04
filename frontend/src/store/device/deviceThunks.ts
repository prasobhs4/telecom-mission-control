import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setDiscoveredDevices, setSimulatedDevice } from "./deviceActions";
import { AppDispatch } from "../store";

export const fetchDevices = () => async (dispatch: AppDispatch) => {
  const res = await axios.get(`${API_BASE}/device-discovery`);
  dispatch(setDiscoveredDevices(res.data));
};

export const simulateDevice = (device: any) => async (dispatch: AppDispatch) => {
  await axios.post(`${API_BASE}/simulate-device`, device);
  dispatch(setSimulatedDevice(device));
};
