import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from './selectionSlice';
import type { Store } from 'redux';

export const store: Store = configureStore({
  reducer: {
    selection: selectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
