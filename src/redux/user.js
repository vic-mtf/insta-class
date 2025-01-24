import { createSlice } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";
import deepMerge from "../utils/deepMerge";

const user = createSlice({
  name: "user",
  initialState: {
    connected: false,
    //image: null,
  },
  reducers: {
    updateUser(state, actions) {
      const { data } = actions.payload;
      const states = deepMerge(state, data);
      Object.keys(states).forEach((key) => {
        state[key] = states[key];
      });
    },
    disconnected(state) {
      state.connected = false;
    },
  },
});

export const { disconnected, updateUser } = user.actions;
export default persistReducer(
  {
    storage,
    key: "__INSTA_CLASS_DATA__",
  },
  user.reducer
);
