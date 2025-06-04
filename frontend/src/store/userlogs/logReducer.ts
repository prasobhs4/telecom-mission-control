import { createReducer } from "@reduxjs/toolkit";
import { setUserLogs } from "./logActions";

const logReducer = createReducer<any[]>([], (builder) => {
  builder.addCase(setUserLogs, (_, action) => action.payload);
});

export default logReducer;
