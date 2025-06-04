import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setTowers, removeTowerId } from "./towerActions";
import { AppDispatch } from "../store";
import { Tower } from "../../types/carrierType";
import { TowerRegistrationData } from "../../types/carrierType";

export const fetchTowers = () => async (dispatch: AppDispatch) => {
  const response = await axios.get<Tower[]>(`${API_BASE}/towers`);
  const ids = response.data.map((t) => t.id);
  dispatch(setTowers(ids));
};

export const registerTower = (data: TowerRegistrationData) => async (
  dispatch: AppDispatch
) => {
  await axios.post(`${API_BASE}/register-tower`, data);
  dispatch(removeTowerId(data.id));
};
