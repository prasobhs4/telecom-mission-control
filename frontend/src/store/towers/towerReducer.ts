import { createReducer } from "@reduxjs/toolkit";
import { setTowers, removeTowerId } from "./towerActions";

const towerReducer = createReducer<string[]>([], (builder) => {
  builder
    .addCase(setTowers, (_, action) => action.payload)
    .addCase(removeTowerId, (state, action) => state.filter((id) => id !== action.payload));
});

export default towerReducer;
