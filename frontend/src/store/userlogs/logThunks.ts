import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setUserLogs } from "./logActions";

export const fetchUserLogs =
  (params: { carrier: string; start: string; end: string }) =>
  async (dispatch: any) => {
    const response = await axios.get(`${API_BASE}/user-logs`, { params });
    dispatch(setUserLogs(response.data));
  };
