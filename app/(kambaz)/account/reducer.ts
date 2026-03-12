import { createSlice } from '@reduxjs/toolkit';

interface User {
  _id?: string;
  username?: string;
  role?: string;
  [key: string]: any;
}

const initialState: { currentUser: User | null } = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
