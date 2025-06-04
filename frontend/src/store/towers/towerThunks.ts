import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setTowers, removeTowerId } from "./towerActions";
import { AppDispatch } from "../store";

export const fetchTowers = () => async (dispatch: AppDispatch) => {
  const response = await axios.get(`${API_BASE}/towers`);
  const ids = response.data.map((t: any) => t.towerId);
  dispatch(setTowers(ids));
};

export const registerTower = (data: any) => async (dispatch: AppDispatch) => {
  await axios.post(`${API_BASE}/register-tower`, data);
  dispatch(removeTowerId(data.id));
};
