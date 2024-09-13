import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: Record<string, any>;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
    user: (state, { payload }) => {
      state.user = payload;
    }
  },
});

export const { login, logout, user } = authSlice.actions;

export default authSlice.reducer;
