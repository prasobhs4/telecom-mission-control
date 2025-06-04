import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setUserLogs } from "./logActions";
import { AppDispatch } from "../store";

export const fetchUserLogs = (params: { carrier: string; start: string; end: string }) =>
  async (dispatch: AppDispatch) => {
    const response = await axios.get(`${API_BASE}/user-logs`, { params });
    dispatch(setUserLogs(response.data));
  };
