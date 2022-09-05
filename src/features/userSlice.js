import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },

  reducers: {
    loginuser: (state, action) => {

      state.user = action.payload;
    },
    logoutuser: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    }

  },


});

export const { loginuser, logoutuser, updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
