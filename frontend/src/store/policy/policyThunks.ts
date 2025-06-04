import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setPolicyApplied } from "./policyActions";

export const savePolicy = (payload: any) => async (dispatch: any) => {
  await axios.post(`${API_BASE}/policy`, payload);
  dispatch(setPolicyApplied(true));
};
