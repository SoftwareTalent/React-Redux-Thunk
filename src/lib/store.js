// Setup redux store here
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist';
import axiosInstance from '../utils/axios';

import userReducer, { initialState as userInitialState } from './userSlice';
import configReducer, { initialState as configInitialState } from './configSlice';
import modalReducer, { initialState as modalInitialState } from './modalSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['modal'],
};

const reducer = combineReducers({ user: userReducer, config: configReducer, modal: modalReducer });

const persistedReducer = persistReducer(persistConfig, reducer);

const preloadedState = {
  user: userInitialState,
  config: configInitialState,
  modal: modalInitialState,
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axiosInstance,
      },
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
});

export const persistor = persistStore(store);
