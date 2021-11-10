import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "xiao",
  firstName: "runlin",
  lastName: "Xiao",
  role: "adm",
  jwt: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWFjdC53ZWJhcHBAYXN1LmVkdSIsImlhdCI6MTYzNTc2NjkyOH0.dmAUUXCCDjh2InBCND7-2Unjtpc4YDl2AuYMXOtxFNfkPrQdKBSpK-pmOiCeQjPsGCQjpOnrYj08_30jXGSaxg"
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
