import { createSlice } from '@reduxjs/toolkit';


const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    theme: 'light',
    language: 'en',
  },
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setTheme, toggleTheme, setLanguage } = settingSlice.actions;
export default settingSlice.reducer;
