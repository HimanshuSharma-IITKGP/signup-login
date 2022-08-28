import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  initialState: initialState,
  name: "user",
  reducers: {
    signUp(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.name = ''
      state.email = ''
      state.token = ''
      state.isAuthenticated = false
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
