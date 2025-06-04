import { createAction } from "@reduxjs/toolkit";
import { LogEntry } from "../../types/carrierType";

export const setUserLogs = createAction<LogEntry[]>("logs/setUserLogs");
