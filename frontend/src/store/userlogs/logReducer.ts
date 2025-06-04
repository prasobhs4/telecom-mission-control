import { createReducer } from "@reduxjs/toolkit";
import { setUserLogs } from "./logActions";
import { LogEntry } from "../../types/carrierType";

const logReducer = createReducer<LogEntry[]>([], (builder) => {
  builder.addCase(setUserLogs, (_, action) => action.payload);
});

export default logReducer;
