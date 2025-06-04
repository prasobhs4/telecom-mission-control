import { createReducer } from "@reduxjs/toolkit";
import { setPolicyApplied } from "./policyActions";

const policyReducer = createReducer({ applied: false }, (builder) => {
  builder.addCase(setPolicyApplied, (state, action) => {
    state.applied = action.payload;
  });
});

export default policyReducer;
