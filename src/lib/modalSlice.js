// Setup user slice here

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isOpen: true,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      return {
        ...state,
        isOpen: action.payload,
      };
    },
  },
});

export const { setOpen } = modalSlice.actions;

export default modalSlice.reducer;
