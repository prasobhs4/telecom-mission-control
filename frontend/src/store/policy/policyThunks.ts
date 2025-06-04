import axios from "axios";
import { API_BASE } from "../../constants/constants";
import { setPolicyApplied } from "./policyActions";
import { AppDispatch } from "../store";
import { PolicyPayload } from "../../types/carrierType";

export const savePolicy = (payload: PolicyPayload) => async (
  dispatch: AppDispatch
) => {
  await axios.post(`${API_BASE}/policy`, payload);
  dispatch(setPolicyApplied(true));
};
