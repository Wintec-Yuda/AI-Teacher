import { globalState } from '@/app/types/state';
import { createSlice } from '@reduxjs/toolkit';

const initialState: globalState = {
  loading: false,
  activeTab: 0
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    }
  }
});

export const { setLoading, setActiveTab } = globalSlice.actions;

export default globalSlice.reducer;
