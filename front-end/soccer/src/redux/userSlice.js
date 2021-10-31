import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "xiao",
  firstName: "runlin",
  lastName: "Xiao",
  role: "adm",
  jwt: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyb2JvdEBhc3UuZWR1IiwiaWF0IjoxNjM1NzE2ODQ4LCJleHAiOjE2MzU4MDMyNDh9.S5S-8ee2RaR_JIoKEDqrxfg7aoGCxVPIdwRTeZ-IS6bhG7iOXtzOdsO-vbtt2GcYOmkUNhbSbDxwakdetpYmag"
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUser: (state=initialState, action) => {
      console.log("in set");
      if (action.payload.isLoggedIn === false) {
        console.log("is False");
        return state;
      }
      console.log("is True");
      state.isLoggedIn = true;
      state.jwt = action.payload.jwt;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;
