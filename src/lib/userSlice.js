// Setup user slice here

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../utils/user';

export const initialState = {
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  data: {},
};

export const getUserAnswers = createAsyncThunk('user/getUserAnswers', async (_, { extra: axios }) => {
  const { data = [] } = await axios.get('questionnaire/');
  return data?.find(({ user }) => user && user === getUser());
});

export const submitUserAnswers = createAsyncThunk('user/submitUserAnswers', async (_, { extra: axios, getState }) => {
  const { data = {} } = await axios.post('questionnaire/', {
    ...(getState()?.user?.data ?? {}),
    user: getUser(),
  });
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          ...(action.payload ?? {}),
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAnswers.fulfilled, (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload ?? {},
      };
    });
    builder.addCase(getUserAnswers.pending, (state, action) => {
      return {
        ...state,
        isLoading: true,
      };
    });
    builder.addCase(getUserAnswers.rejected, (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: {},
      };
    });
    builder.addCase(submitUserAnswers.fulfilled, (state, action) => {
      return {
        ...state,
        isCreating: false,
        data: action.payload ?? {},
      };
    });
    builder.addCase(submitUserAnswers.pending, (state, action) => {
      return {
        ...state,
        isCreating: true,
      };
    });
    builder.addCase(submitUserAnswers.rejected, (state, action) => {
      return {
        ...state,
        isCreating: false,
      };
    });
  },
});

export const { setAnswer } = userSlice.actions;

export default userSlice.reducer;
