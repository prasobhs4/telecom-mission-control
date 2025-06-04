import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setDashboardData } from "./dashboardActions";
import { AppDispatch } from "../store";

export const fetchDashboard = (carrier: string) => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE}/dashboard`, {
    params: { carrier },
    headers: { "Cache-Control": "no-cache" },
  });
  dispatch(setDashboardData(response));
};
