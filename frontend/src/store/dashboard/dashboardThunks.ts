import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setDashboardData } from "./dashboardActions";

export const fetchDashboard = (carrier: string) => async (dispatch: any) => {
  const response = await axios.get(`${API_BASE}/dashboard`, {
    params: { carrier },
    headers: { "Cache-Control": "no-cache" },
  });
  dispatch(setDashboardData(response));
};
