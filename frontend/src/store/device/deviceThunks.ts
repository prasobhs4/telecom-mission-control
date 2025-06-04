import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setDiscoveredDevices, setSimulatedDevice } from "./deviceActions";

export const fetchDevices = () => async (dispatch: any) => {
  const res = await axios.get(`${API_BASE}/device-discovery`);
  dispatch(setDiscoveredDevices(res.data));
};

export const simulateDevice = (device: any) => async (dispatch: any) => {
  await axios.post(`${API_BASE}/simulate-device`, device);
  dispatch(setSimulatedDevice(device));
};
