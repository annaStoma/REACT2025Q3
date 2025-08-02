import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../components/models/pokemon';

interface SelectionState {
  selectedItems: Pokemon[];
}

const initialState: SelectionState = {
  selectedItems: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;
      if (state.selectedItems.some((item) => item.id === pokemon.id)) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== pokemon.id
        );
      } else {
        state.selectedItems.push(pokemon);
      }
    },
    clearSelection: (state) => {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelection, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
