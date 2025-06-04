import { createReducer } from "@reduxjs/toolkit";
import { setDiscoveredDevices, setSimulatedDevice } from "./deviceActions";
import { DeviceState } from "../../types/carrierType";

const initialState: DeviceState = {
  discovered: [],
  simulated: null,
};

const deviceReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setDiscoveredDevices, (state, action) => {
      state.discovered = action.payload;
    })
    .addCase(setSimulatedDevice, (state, action) => {
      state.simulated = action.payload;
    });
});

export default deviceReducer;
