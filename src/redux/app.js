import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import deepMerge from "../utils/deepMerge";

const user = createSlice({
  name: "app",
  initialState: {
    user: null,
    remembered: false,
  },
  reducers: {
    updateApp(state, actions) {
      const { data } = actions.payload;
      const states = deepMerge(state, data);
      Object.keys(states).forEach((key) => {
        state[key] = states[key];
      });
    },
  },
});

export const { disconnected, updateApp } = user.actions;
export default persistReducer(
  {
    storage,
    key: "__INSTA_CLASS_DATA__LOCAL_STORAGE__",
  },
  user.reducer
);
