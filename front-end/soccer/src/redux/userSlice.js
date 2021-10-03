import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  jwt: "",
};

const userSlice = createSlice({
  name: userInfo,
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload.isLoggedIn == false) {
        return state;
      }
      state.isLoggedIn = true;
      state.jwt = action.payload.jwt;
      state.email = action.payload.eMailAddress;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
