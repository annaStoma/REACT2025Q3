import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from '../store/selectionSlice';
import type { Store } from 'redux';

export const mockStore: Store = configureStore({
  reducer: { selection: selectionReducer },
  preloadedState: { selection: { selectedItems: [] } },
});
