import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setUserLogs } from "./logActions";
import { LogEntry } from "../../types/carrierType";
import { AppDispatch } from "../store";

export const fetchUserLogs =
  (params: { carrier: string; start: string; end: string }) =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get<LogEntry[]>(`${API_BASE}/user-logs`, { params });
    dispatch(setUserLogs(response.data));
  };
