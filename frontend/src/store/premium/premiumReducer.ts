import { createReducer } from "@reduxjs/toolkit";
import { setPremium } from "./premiumActions";

const premiumReducer = createReducer({ upgraded: false }, (builder) => {
  builder.addCase(setPremium, (state, action) => {
    state.upgraded = action.payload;
  });
});

export default premiumReducer;
