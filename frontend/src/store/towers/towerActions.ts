import { createAction } from "@reduxjs/toolkit";

export const setTowers = createAction<string[]>("towers/setTowers");
export const removeTowerId = createAction<string>("towers/removeTowerId");
