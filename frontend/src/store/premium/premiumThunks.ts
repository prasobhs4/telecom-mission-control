import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setPremium } from "./premiumActions";

export const upgradeAccount = (carrier: string) => async (dispatch: any) => {
  await axios.post(`${API_BASE}/upgrade`, { carrier });
  dispatch(setPremium(true));
};
