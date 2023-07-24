// Setup user slice here

import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  disableModal: false,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setDisableModal: (state) => {
      return {
        ...state,
        disableModal: true,
      };
    },
  },
});

export const { setDisableModal } = configSlice.actions;

export default configSlice.reducer;
